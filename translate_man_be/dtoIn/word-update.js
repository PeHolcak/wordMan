import * as proptype from 'yup';

export default proptype.object().shape({
    id:  proptype.string().required(),
    name: proptype.string().required().max(200),
    desc: proptype.string().max(500),
    credits: proptype.number().required(),
    supervisor: proptype.string().required().max(200),
    goal: proptype.string().required().max(200),
    topicIdList: proptype.array().of(proptype.string()).required(),
    materialIdList: proptype.array().of(proptype.string()).required(),
    language: proptype.array().of(proptype.mixed().oneOf(["CZ", "EN"])).required(),
    degreeOfStudy: proptype.array().of(proptype.mixed().oneOf(["bc","mgr","phd"])).required(),
    formOfStudy: proptype.array().of(proptype.mixed().oneOf(["obligatory","selective","obligatory-selective"])).required()
  });
  