module.exports = app => {
  /**
   * TENER EXTREMO CUIDADO con la colocación de esta ruta.
   * Si se declarase, deberia ser siempre la última del proyecto.
   * Si estuviese de primera, ninguna otra ruta podria ejecutarse
   */
  app.get("*", (req, res) => {
    res.send("La URL solicitada no existe");
  });
};
