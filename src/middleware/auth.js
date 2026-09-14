import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
  try {
    // Leer el token del encabezado (header) de la petición
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
      return res.status(401).json({ mensaje: 'Acceso denegado. No hay token provisto.' });
    }

    // Verificar el token usando la palabra secreta del archivo .env
    const verificado = jwt.verify(token, process.env.JWT_SECRET);
    req.user = verificado;

    // Continuar a la siguiente función o ruta
    next();
  } catch (error) {
    res.status(400).json({ mensaje: 'Token no válido' });
  }
};