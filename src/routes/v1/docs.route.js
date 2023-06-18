const express = require('express');
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
const swaggerDefinition = require('../../docs/swaggerDef');

const router = express.Router();

const specs = swaggerJsdoc({
  swaggerDefinition,
  apis: ['src/docs/*.yml', 'src/routes/v1/*.js']
});

router.use('/', swaggerUi.serve);
router.get(
  '/',
  swaggerUi.setup(specs, {
    swaggerOptions: {
      requestInterceptor: (request) => {
        function getCookie(cookieName) {
          const name = `${cookieName}=`;
          const decodedCookie = decodeURIComponent(document.cookie);
          const cookieArray = decodedCookie.split(';');

          for (let i = 0; i < cookieArray.length; i += 1) {
            let cookie = cookieArray[i];
            while (cookie.charAt(0) === ' ') {
              cookie = cookie.substring(1);
            }
            if (cookie.indexOf(name) === 0) {
              return cookie.substring(name.length, cookie.length);
            }
          }
          return '';
        }

        request.headers.Authorization = `Bearer ${getCookie('token')}`;
        request.headers.User = `usercode:${getCookie('id')}`;
        return request;
      }
    }
  })
);

router.get('/swagger.json', (req, res) => {
  res.setHeader('Content-Type', 'application/json');
  res.send(specs);
});

module.exports = router;
