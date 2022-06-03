import * as proptype from 'yup';

export default proptype.object().shape({
    firstName: proptype.string().required().max(25).min(5),
    lastName: proptype.string().required().max(25).min(5),
    login: proptype.string().required().max(25).min(5),
    password: proptype.string().required().max(50).min(10),
    phoneContact: proptype.string().required().max(16).min(9),
    emailContact: proptype.string().required().max(25).min(5),
    profilePhoto: proptype.string().required().max(1000000).min(1),
  });
  