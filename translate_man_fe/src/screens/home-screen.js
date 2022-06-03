import React, { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import { WordCard } from "../bricks/word-card/word-card";
import axios from "axios";
import Loader from "../bricks/loader/loader";
import styles from "./home-screen.module.css";
import { useTranslation } from "react-i18next";

const HomeScreen =  forwardRef(({openModal}, ref) => {
  const [words, setWords] = useState([]);
  const [loadingState, setLoadingState] = useState("loading");
  const { t } = useTranslation();

  useImperativeHandle(ref, () => ({
    refreh() {
      loadData();
    }
  }));

  useEffect(() => {
    loadData();
  }, []);

  const loadData = () => {
    axios
      .get("/api/word/list", {})
      .then((dtoOut = {}) => {
        if (dtoOut.status > 199 && dtoOut.status < 300) {
          setLoadingState("ready");
          setWords((dtoOut.data || {}).wordList);
        } else {
          setLoadingState("error");
        }
      })
      .catch((error) => {
        setLoadingState("error");
      });
  };

  switch (loadingState) {
    case "loading":
      return <Loader />;

    case "ready":
      return (
        <section className={styles.wordListWrapper}>
          {Array.isArray(words) ? (
            words.reduce((result, word, index) => {
              if (word.firstSideWord && word.secondSideWord) {
                result.push(
                  <WordCard
                    key={index}
                    openModal={openModal}
                    frontSide={{
                      title: word.firstSideWord,
                      definition: word.firstSideWordDescription,
                    }}
                    backSide={{
                      title: word.secondSideWord,
                      definition: word.secondSideWordDescription,
                    }}
                  />
                );
              }
              return result;
            }, [])
          ) : (
            <p className={styles.message}>{t("homeScreen.noData")}</p>
          )}
        </section>
      );
    default:
      return <p className={styles.message}>{t("homeScreen.loadError")}</p>;
  }
});

export default HomeScreen;
