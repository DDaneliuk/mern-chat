import Message from '../models/message.model.js';
import Conversation from '../models/conversation.model.js';

export const sendMessage = async (req, res) => {
  try{
    const { message } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    let conversation = await Conversation.findOne({
      participants: { $all: [receiverId, senderId]}
    });

    if(!conversation) {
      conversation = await Conversation.create({
        participants: [receiverId, senderId],
      })
    }

    const newMessage = new Message({
      senderId,
      receiverId,
      message
    });

    if(newMessage){
      conversation.messages.push(newMessage._id);
    }

    await Promise.all([conversation.save(), newMessage.save()]);

    res.status(200).json(newMessage);

  } catch (e){
    console.log('[POST] Message', e);
    res.status(500).json({ error: '[POST] Message. Internal Server Error' });
  }
}

export const getMessage = async (req, res) => {
  try{
    const { id: userToChatId } = req.params;
    const senderId = req.user._id;

    const conversation = await Conversation.findOne({
      participants: { $all: [ senderId, userToChatId]},
    }).populate("messages");

    if(!conversation) return res.status(200).json([]);

    const messages = conversation.messages;

    res.status(200).json(messages);
  } catch (e){
    console.log('[GET] Message', e);
    res.status(500).json({ error: '[GET] Message. Internal Server Error' });
  }
}