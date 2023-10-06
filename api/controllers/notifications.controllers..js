import User from "../models/users.js"
import Notifications from "../models/notifications.js";

export const saveNotification = async (req, res) => { 
    const { userId, typeOfNotification, message, dateNotification, isRead, recipientId, recipientName, publicationId } = req.body;

    try {
        const creator = await User.find({_id: userId});
    
        if (!creator) {
          return res.status(404).json({ message: 'Usuario no encontrado' });
        }

        const theNewNotification = new Notifications({
            creator,
            typeOfNotification,
            dateNotification,
            message,
            isRead,
            recipientId,
            recipientName,
            publicationId,
          })
          theNewNotification.save()
                            .then((saved) => { 
                                res.json({message: "Notificacion enviada", saved})
                            })
                            .catch((err) => { 
                                console.log(err)
                                return res.status(500).json({ message: 'Error al crear la notificación' });
                            })
    } catch(err) { 
        console.log(err)
        return res.status(500).json({ message: 'Error al crear la notificación' });
    }
}

export const searchingNotifications = async (req, res) => { 
     const {userId} = req.params

     Notifications.find({recipientId: userId})
                  .then((notis) => { 
                    res.json(notis)
                  })
                  .catch((err) => { 
                    console.log(err)
                  })
}