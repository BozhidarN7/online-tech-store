import admin from 'firebase-admin';

const serviceAccount = {
    type: 'service_account',
    project_id: 'online-store-57854',
    private_key_id: '42d171d999ed5cdb2776f506683f3f64b2bd1227',
    private_key:
        '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDXP5yOM7xS5sC7\nIjTJV1qw3Z/CnE+r0rEFK70iO+kqRlXsaukzuklMVkrHL2fn7IFZU20TL7gn+QIu\naSM9D9C+QI5X0GYRolnnz+mLVgKd0DS4r0OfNwFchuJ9wawAC5HLWwenObfGNcoU\nrW7okc2Gxu/1S64QLDLU+Aka/ohA/qRuz6aR2tlpBmh3psAaBlGxwcmClm3O/so9\nI41CYeYrPN3t9yhQGwRctlpLHt7U8TjocP8fh3bLWmzBQZUxoRK2EJLRaM1p5Z9c\nzl3Ozy++gfS2E+ka3WHF4H9Q3sp+vT9uH17q7w4Ja6DQmRktJ+ZoD4tlYqnZejXq\nQoYrt+QHAgMBAAECggEAAlY69WJDZ6UAr6dp6kur/OKTEvJOfR+O827roT0ERYS4\n9xWcDYc2t4DyU+JEXwS2zMj2lLA+cBSofOeATe/nhME/ql1lVkiscDNWJkCbS6pQ\ngDbK5aYbuizutY3ON7voa8xDs4GRaLH5zSqq2xSGJjHvtfqJ27wXGy/MLYJY6Ve1\nRsASxnq5vt73h/Mjc+Ytsd/F5fIB3gdpG+N/vpnFfxV/GF93YZPh258+WJT4qQZ2\nvHmhnwcWNsu0xL9QK1I2nPIfiYPBnUedmnmT5fxiQoqYPVDnPJtRkO0+0qd3u9HL\neGcXryLM+5XJJD0zzuyc+uRHo7Cx3sFHLA3hRE2uAQKBgQD6YnEtmvrSyh+cJZav\nrx7/6illNJQnhGRxdODx1eebihQsFihuer3T+uVhJ1ECJ0LfC/T5Hne3gINNDMaP\nYjtEFfrKRum+Dv5Yrs+isEOM7i+NN6aKzItoz7SmECEWQaBxpuh1pECw+jpJnHs7\nUYUOMFSZ+JPmPchFTLZLnA8mAQKBgQDcE3B0FomXljCX0btdlPQPBGnhE+9FvRmq\n478NFfBzsvjGwjJ62iBnyk16AyC1pBoEnCCZSU6gNi4sUJsTQSNEZ1TBS5rl9vmr\nCD2P64ghIbCSV7JuflWCI2T3sUFAo3detTOkSqT3Rq+MzispjQwfGN+hvUiJKIE2\nekSxOvHaBwKBgDVkPowiCzBdx4XNgiduaWba8P7SynDuy1hiOwF2wo+pTwnjo7WD\nWO1WCAnCj4StCJZ1f0SMGa04q0cH3WN/5/Fp2nO90WQk4Fna1Q31FkJ8HAm5/zqD\nyYqNGBF9SQDs96CknddQMjdK9Jjz1Fde18ehyLiYiDlFnWohpJHU8moBAoGAXe2C\nClnwIZ19Yd6mzDsdqyckFWdPsQETamdHjEs30/mnyhTqPJrKR+IFDTU2ia/fVuZX\n13R9NU3KiSlh9mbPqYs8lj8xfkLZrlCXDczlzdY2KU96nUQYNLHsjva9NdxOv0Ix\nJ0agf9VQaZU4wMQtTzxrfflucvOxqlGm7cmNnZMCgYEAkgI5EGbV5tLmYL88kLga\nHd9AglmMxOYtzVsnMsx6zIH1DgWUAhOwYahU9qIbchjoRpqYmMP0c+psBmS6alQI\nhwgSTItcoO5K6XaPd2qCpQbRWSErskuxhVM9IFDfV3j90tes4KbOGLyo9Z3JfqOR\nrc0iCxLo+Bd/PPTqVYGDNdQ=\n-----END PRIVATE KEY-----\n',
    client_email: 'firebase-adminsdk-kfuqq@online-store-57854.iam.gserviceaccount.com',
    client_id: '111830944579899127262',
    auth_uri: 'https://accounts.google.com/o/oauth2/auth',
    token_uri: 'https://oauth2.googleapis.com/token',
    auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
    client_x509_cert_url:
        'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-kfuqq%40online-store-57854.iam.gserviceaccount.com',
};

export const firebaseConfig = () => {
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
    });
};

export default admin;
