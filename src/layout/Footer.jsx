import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { basicInformation, usePages } from "../services/api";

import Body from "../components/filters_page/Body";
import Card from "../components/filters_page/Card";

import logo from "../assets/images/footer-logo.png";

import { Instagram, Telegram, WhatsApp } from "@mui/icons-material";
import { Tooltip } from "@mui/material";
import { useTranslation } from "react-i18next";
import classes from "./Footer.module.css";
const Footer = () => {
  const [footerData, setFooterData] = useState(null);
  const { data: pageData } = usePages();

  const lng = useSelector((state) => state.localeStore.lng);

  const { t } = useTranslation();

  const fetchFooterLinks = async () => {
    const serverRes = await basicInformation();
    if (serverRes.response.ok) {
      setFooterData(serverRes.result.data.at(0));
    }
  };

  useEffect(() => {
    fetchFooterLinks();
  }, []);

  const getKeys = (data, dataKey) => {
    const keys = Object.keys(data).filter((key) => {
      const startsWithPrefix = key.startsWith(dataKey);
      return startsWithPrefix;
    });

    return keys.map((key) => (
      <a key={key} href="#">
        {data[key]}
      </a>
    ));
  };

  return (
    <>
      {footerData && (
        <footer className={classes.footer}>
          <Body parentClass={classes.body}>
            <Card className={classes.card}>
              <div className={classes.content}>
                <a href={`/${lng}/`} className={classes.image_wrapper}>
                  <img className={classes.footer_logo} src={logo} alt="" />
                </a>
                <div className={classes.links}>
                  <span
                    style={{ textAlign: `${lng === "fa" ? "right" : "left"}` }}
                  >
                    <p className={classes.title}>
                      {lng === "fa"
                        ? footerData.footer_1
                        : footerData.footer_1_en}
                    </p>

                    {pageData &&
                      pageData.data.map((elem, i) => {
                        if (i < 5) {
                          return (
                            <a key={i} href={`/${lng}/page/${elem.alias}`}>
                              {lng === "fa" ? elem.title : elem.title_en}
                            </a>
                          );
                        }
                      })}
                    <a href={`/${lng}/contact-us`}>{t("contactus")}</a>
                  </span>
                  <span
                    style={{ textAlign: `${lng === "fa" ? "right" : "left"}` }}
                  >
                    <p className={classes.title}>
                      {lng === "fa"
                        ? footerData.footer_2
                        : footerData.footer_2_en}
                    </p>
                    {pageData &&
                      pageData.data.map((elem, i) => {
                        if (i >= 5 && i < 7) {
                          return (
                            <a key={i} href={`/${lng}/page/${elem.alias}`}>
                              {lng === "fa" ? elem.title : elem.title_en}
                            </a>
                          );
                        }
                      })}
                  </span>
                  <span
                    className={classes.support}
                    style={{ textAlign: `${lng === "fa" ? "right" : "left"}` }}
                  >
                    <p className={classes.title}>
                      {lng === "fa"
                        ? footerData.footer_3
                        : footerData.footer_3_en}
                    </p>
                    {pageData &&
                      pageData.data.map((elem, i) => {
                        if (i >= 7 && i < 9) {
                          return (
                            <a key={i} href={`/${lng}/page/${elem.alias}`}>
                              {lng === "fa" ? elem.title : elem.title_en}
                            </a>
                          );
                        }
                      })}
                  </span>
                  <span
                    className={classes.support}
                    style={{ textAlign: `${lng === "fa" ? "right" : "left"}` }}
                  >
                    <p className={classes.title}>{t("validation")}</p>
                    {lng === "fa" && (
                      <a
                        referrerpolicy="origin"
                        className={classes.image_wrapper}
                        style={{ width: "100%", height: "100%" }}
                        target="_blank"
                        href={
                          "https://trustseal.enamad.ir/?id=602035&Code=sKIlA1X6dHsFDqMNTCEJhTVjsyLagYcw"
                        }
                      >
                        <img
                          referrerpolicy="origin"
                          src={
                            "https://trustseal.enamad.ir/logo.aspx?id=602035&Code=sKIlA1X6dHsFDqMNTCEJhTVjsyLagYcw"
                          }
                          alt=""
                          style={{ cursor: "pointer" }}
                          code="sKIlA1X6dHsFDqMNTCEJhTVjsyLagYcw"
                        />
                      </a>
                    )}
                  </span>
                </div>
                <div></div>
              </div>
              <div className={classes.divider}></div>
              <div className={classes.social_media_links}>
                <Tooltip title={"Instagram"} arrow placement="top">
                  {console.log(footerData)}
                  <a
                    href={`https://www.instagram.com/${footerData.instagram}/`}
                    target="_blank"
                  >
                    <Instagram sx={{ color: "grey" }} fontSize="10" />
                  </a>
                </Tooltip>
                <Tooltip title={"telegram"} arrow placement="top">
                  <a
                    href={`https://t.me/${footerData.telegram}`}
                    target="_blank"
                  >
                    <Telegram sx={{ color: "grey" }} fontSize="10" />
                  </a>
                </Tooltip>
                <Tooltip title={"whatsapp"} arrow placement="top">
                  <a
                    href={`https://wa.me/${footerData.whatsapp}`}
                    target="_blank"
                  >
                    <WhatsApp sx={{ color: "grey" }} fontSize="10" />
                  </a>
                </Tooltip>
              </div>
            </Card>
          </Body>
        </footer>
      )}
    </>
  );
};

export default Footer;
