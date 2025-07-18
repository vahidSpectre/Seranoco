import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';

import CustomSection from '../layout/CustomSection';
import Link from './Link';

import filterByShape from '../assets/images/Shop_by_Shape.webp';
import filterByColor from '../assets/images/Shop_by-color_1.webp';
import { homePageCategories } from '../services/api';

import classes from './FilterLinks.module.css';
import Body from './filters_page/Body';
import Card from './filters_page/Card';
const FilterLinks = ({ className }) => {
 const [linkData, setLinkData] = useState(null);
 const { t } = useTranslation();

 const lng = useSelector(state => state.localeStore.lng);

 const getHomeCategories = async () => {
  const serverRes = await homePageCategories(lng);
  if (serverRes.response.ok) {
   setLinkData(serverRes.result.data);
  }
 };

 useEffect(() => {
  getHomeCategories();
 }, []);

 return (
  <Body>
   <Card className={classes.main}>
    <Link
     imgUrl={filterByColor}
     title={t('shop_by_color')}
     href={'shopbycolor'}
    />
    <Link
     imgUrl={filterByShape}
     title={t('shop_by_shape')}
     href={'shopbyshape'}
    />
    <Link
     imgUrl={null}
     title={t('new_product')}
     className={classes.new}
     helper_className={classes.helper}
     hepler_text={t('new')}
     href={'new-products'}
    />
    {}
    {linkData &&
     linkData.map(elem => {
      return (
       <Link
        href={`special/${elem.id}`}
        imgUrl={elem.banner_image}
        title={lng === 'en' ? elem.name : elem.name_fa}
        key={nanoid()}
       />
      );
     })}
   </Card>
  </Body>
 );
};

export default FilterLinks;
