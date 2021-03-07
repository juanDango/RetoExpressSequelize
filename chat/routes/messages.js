var express = require('express');
var router = express.Router();
const Joi = require('joi');
const Messages = require('../models/mensajes.js')



// Obtiene la lista de mensajes en el chat
router.get('/', function(req, res, next) {
  Messages.findAll().then(result =>{
    res.send(result);
  })
});

// Obtiene el mensaje con el timestamp que se pasa como parámetro
router.get('/:ts', function(req, res, next){
  Messages.findOne({where:{ts: req.params.ts}}).then(result=>{
    res.send(result);
  })
})

// Añade al json el mensaje que llega en el cuerpo de la petición HTTP
router.post('/', function(req, res, next) {

  const validacion = validateMensaje(req.body);
  if(validacion.error){
    return res.status(400).send(validacion.error.details[0].message);
  }

  const {message, author, ts} = req.body;
  Messages.create({message, author, ts}).then(result =>{
    res.send(result);
  })
});


router.put('/', function(req, res, next) {


  const validacion = validateMensaje(req.body);
  if(validacion.error){
    return res.status(400).send(validacion.error.details[0].message);
  }

  Messages.update(req.body, {where:{ ts: req.body.ts }}).then(result => {
    if(result[0]===0){
      res.status(404).send('Mensaje con el timestamp deseado no encontrado')
    }
    res.status(200).send('Actualizado con exito')
  })
});

router.delete('/:ts', function(req, res, next) {
  Messages.destroy({where: {ts: req.params.ts}}).then(result=>{
    if(result===0){
      res.status(404).send('Mensaje con el timestamp deseado no encontrado')
    }
    res.status(204).send('mensaje eliminado con exito')
  })
  /*abrirJSON(mensajes => {
    mensaje = mensajes.find(mensaje => mensaje.ts === parseInt(req.params.ts))
    console.log(mensaje)
    if(!mensaje){res.status(404).send("Mensaje con el timestamp no encontrado, el proceso ha fallado exitosamente")}
    
    let index = mensajes.indexOf(mensaje)
    mensajes.splice(index, 1)
  
    fs.writeFile(path, JSON.stringify(mensajes), function (err) {
      if (err) throw err;
    });

    res.status(204).send("Mensaje eliminado con exito")
  });
  */
});

const validateMensaje = (mensaje) =>{
  const schema = Joi.object({
    message: Joi.string()
    .required()
    .min(5),
    author: Joi.string()
    .required()
    .pattern(new RegExp('^[a-zA-Z]* [a-zA-Z]*')),
    ts: Joi.number()
  })

  return schema.validate(mensaje)
}


module.exports = router;
