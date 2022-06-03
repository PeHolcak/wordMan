import React, { useState } from 'react';
import styles from "./word-card.module.css";
import {useTranslation} from "react-i18next";
import { CardDetail } from '../card-detail/card-detail';

type Side = {
  title: string;
  definition: string;
};

type Props = {
  frontSide: Side;
  backSide: Side;
  openModal: Function
};

export const WordCard: React.FC<Props> = props => {
  const { frontSide, backSide } = props;
  const [showBackSide, setShowBackSide] = useState(false);
  const { t } = useTranslation();

  const flipCard = () => {
    setShowBackSide(!showBackSide);
  }

  const showDetail = () => {
    props.openModal(<CardDetail frontSide={frontSide} backSide={backSide}/>);
  };

  const side = showBackSide ? backSide : frontSide;

  const flipButtonText = showBackSide ? t("wordCard.showOriginal") : t("wordCard.showTranslate");
  const showDetailButtonText = t("wordCard.showDetail");

  return (
    <article className={styles.cardWapper}>
          <h3 className={`${styles.cardText} ${styles.cardHeader}`}>{side.title}</h3>
          <p className={`${styles.cardText} ${styles.cardParagraph}`}>{side.definition}</p>
          <div className={styles.cardButtonRowWrapper} >
            <button className={styles.cardButton} onClick={flipCard}>{flipButtonText}</button>
            <button className={`${styles.cardButton} ${styles.showDetailButton}`} onClick={showDetail}>{showDetailButtonText}</button>
          </div>
    </article>
  );
};