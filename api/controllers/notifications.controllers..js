import User from "../models/users.js"
import Notifications from "../models/notifications.js";

export const saveNotification = async (req, res) => { 
    const { userId, typeOfNotification, message, dateNotification, isRead, recipientId, recipientName, publicationId } = req.body;
    console.log("Me llego una notificacion", req.body)

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

export const markAsRead = async (req, res) => {
  try {
    const { notificationId } = req.params;

    const updatedNotification = await Notifications.findOneAndUpdate(
      { _id: notificationId },
      { isRead: true },
      { new: true } 
    )

    if (!updatedNotification) {
      return res.status(404).json({ message: "Notificación no encontrada"});
    }

    res.status(200).json(updatedNotification);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};






