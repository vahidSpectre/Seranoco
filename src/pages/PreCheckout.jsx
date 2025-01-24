import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { Result, Steps } from 'antd';

import { cartActions, drawerActions } from '../store/store';

import Body from '../components/filters_page/Body';
import Card from '../components/filters_page/Card';
import BannerCarousel from '../components/BannerCarousel';
import Header from '../layout/Header';
import Footer from '../layout/Footer';
import ShoppingCart from '../components/checkout/ShoppingCart';
import Payment from '../components/checkout/Payment';
import Checkout from '../components/checkout/Checkout';
import CustomStepper from '../components/common/CustomStepper';

import { getPayments } from '../services/api';

import classes from './PreCheckout.module.css';
import { Button } from '@mui/material';
import { formatNumber } from '../utils/helperFunctions';
import PaymentMethod from '../components/checkout/PaymentMethod';
const PreCheckout = ({ windowSize }) => {
  const [step, setStep] = useState(0);
  const [isDataValid, setIsDataValid] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);

  const { t } = useTranslation();

  const card = useSelector(state => state.cartStore);
  const lng = useSelector(state => state.localeStore.lng);

  const dispatch = useDispatch();

  const p = async () => {
    const serverRes = await getPayments();
    if (serverRes.response.ok) {
      setPaymentMethods(serverRes.result.data);
      console.log(serverRes.result);
    }
  };

  useEffect(() => {
    dispatch(drawerActions.close());
    dispatch(cartActions.calculateTotalPrice());
    p();
    console.log(card.finalPayment);
  }, []);

  const handleGotoNextStep = () => {
    if (step === 0) {
      const products = card.products.filter(el => el.selected_quantity !== 0);
      dispatch(cartActions.setFinalCart(products));
      setStep(step < 2 ? step + 1 : 2);
    }
    if (step === 1 && isDataValid) {
      setStep(step < 2 ? step + 1 : 2);
    }
  };

  return (
    <div className={classes.main}>
      <BannerCarousel />
      <Header windowSize={windowSize} />
      <CustomStepper activeStep={step} className={classes.stepper} />
      <Body>
        <Card className={classes.card}>
          {step === 0 && <ShoppingCart />}
          {step === 1 && <Checkout isDataValid={setIsDataValid} />}
          {step === 2 && <Payment />}
          <div className={classes.action_wrapper}>
            <div
              className={classes.total_wrapper}
              style={{ direction: lng === 'fa' ? 'rtl' : 'ltr' }}
            >
              <span className={classes.title}>{t('pc.payment')}</span>
              {/* {card && (
                <>
                  {step !== 2 ? (
                    <span className={classes.amont}>
                      {lng !== 'fa'
                        ? card?.totalPrice.toFixed(2)
                        : formatNumber(+card?.totalPrice * 50000).toFixed(2)}
                      &nbsp;{t('m_unit')}
                    </span>
                  ) : (
                    <span className={classes.amont}>
                      {lng !== 'fa'
                        ? card?.finalPayment.toFixed(2)
                        : formatNumber(+card?.finalPayment * 50000).toFixed(2)}
                      &nbsp;{t('m_unit')}
                    </span>
                  )}
                </>
              )} */}
            </div>
            <div
              className={classes.total_wrapper}
              style={{ direction: lng === 'fa' ? 'rtl' : 'ltr' }}
            >
              <span className={classes.title}>{t('pc.off')}</span>
              {/* {step !== 2 ? (
                <span className={classes.amont}>
                  {lng !== 'fa'
                    ? card.totalPrice.toFixed(2)
                    : formatNumber(
                        card.totalPrice * 50000,
                      ).toFixed(2)}
                  &nbsp;{t('m_unit')}
                </span>
              ) : (
                <span className={classes.amont}>
                  {lng !== 'fa'
                    ? card.finalPayment.toFixed(2)
                    : formatNumber(
                        card.finalPayment * 50000,
                      ).toFixed(2)}
                  &nbsp;{t('m_unit')}
                </span>
              )} */}
            </div>
            <div
              className={classes.total_wrapper}
              style={{ direction: lng === 'fa' ? 'rtl' : 'ltr' }}
            >
              <span className={classes.title}>{t('pc.dprice')}</span>
              {/* {step !== 2 ? (
                <span className={classes.amont}>
                  {lng !== 'fa'
                    ? card.totalPrice.toFixed(2)
                    : formatNumber(
                        card.totalPrice * card.products.at(0).euro_price,
                      ).toFixed(2)}
                  &nbsp;{t('m_unit')}
                </span>
              ) : (
                <span className={classes.amont}>
                  {lng !== 'fa'
                    ? card.finalPayment.toFixed(2)
                    : formatNumber(
                        card.finalPayment * card.products.at(0).euro_price,
                      ).toFixed(2)}
                  &nbsp;{t('m_unit')}
                </span>
              )} */}
            </div>
            <Button
              className={classes.step_btn}
              onClick={handleGotoNextStep}
              variant='contained'
              size='large'
              disabled={step === 1 && !isDataValid}
            >
              {t('pc.nstep')}
            </Button>
            <Button
              className={classes.step_btn_back}
              onClick={() => setStep(step > 0 ? step - 1 : 0)}
              variant='text'
              size='large'
            >
              {t('pc.pstep')}
            </Button>
            {true && <PaymentMethod dataProps={paymentMethods} />}
          </div>
        </Card>
      </Body>

      <Footer />
    </div>
  );
};

export default PreCheckout;