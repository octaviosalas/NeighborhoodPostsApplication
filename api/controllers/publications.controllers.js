


export const savePublication = async (req, res) => { 
   const data = req.body
   console.log(data)
   res.json({message: "Recivied!!!", data})
}