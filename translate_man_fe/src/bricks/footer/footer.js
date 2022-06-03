import React from 'react';
import styles from './footer.module.css';
import {useTranslation} from "react-i18next";

function Footer() {
    const { t } = useTranslation();
    return (
        <footer className={styles.footer}>
            {t("footer")}
        </footer>
    )
}

export default Footer;
