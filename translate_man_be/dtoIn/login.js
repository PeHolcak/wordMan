import * as proptype from 'yup';

export default proptype.object().shape({
    login: proptype.string().required().max(20),
    password: proptype.string().required().max(100)
  });
  