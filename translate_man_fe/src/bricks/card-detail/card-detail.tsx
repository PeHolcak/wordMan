import React, { useState } from 'react';
import styles from "./card-detail.module.css";

type Side = {
  title: string;
  definition: string;
};

type Props = {
  frontSide: Side;
  backSide: Side;
};

export const CardDetail: React.FC<Props> = props => {
  const { frontSide, backSide } = props;

  return (
    <article className={styles.cardWrapper}>
      <div>
        <h3>
          {frontSide.title}
        </h3>
        <p>
          {frontSide.definition}
        </p>
      </div>
      <div>
        <h3>
          {frontSide.title}
        </h3>
        <p>
          {frontSide.definition}
        </p>
      </div>
    </article>
  );
};