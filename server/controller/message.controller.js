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

    res.status(200).json({ message: 'Message sent successfully' });

  } catch (e){
    console.log('e', e);
    res.status(500).json({ error: 'Message. Internal Server Error' });
  }
}