import * as proptype from 'yup';

export default proptype.object().shape({
    login: proptype.string().required(),
    password: proptype.string().required()
  });
  