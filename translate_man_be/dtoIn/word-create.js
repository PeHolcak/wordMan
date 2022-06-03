import * as proptype from 'yup';

export default proptype.object().shape({
    firstSideWord: proptype.string().required().max(50).min(1),
    secondSideWord: proptype.string().required().max(50).min(1),
    firstSideWordDescription: proptype.string().max(500).min(1),
    secondSideWordDescription: proptype.string().max(500).min(1)
});
  