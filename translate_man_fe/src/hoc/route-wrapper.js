import React, {useEffect} from 'react';
import { useTranslation } from "react-i18next";
import styles from "./route-wrapper.module.css";

function RouteWrapper(props) {
    
    const { t } = useTranslation();

    const childrenProps = props;
    const Children = props.children;
    useEffect(() => {
      document.title = `uuwordMan - ${t(`routes.${props.name}`)}`
    }, []);

    return (
        <div className={styles.wrapper}>
            {<Children {...childrenProps}/>}
        </div>
    )
}

export default RouteWrapper;
