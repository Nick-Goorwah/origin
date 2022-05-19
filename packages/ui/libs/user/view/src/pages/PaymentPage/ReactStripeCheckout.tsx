import React from 'react';
// @ts-ignore
import PropTypes from 'prop-types';
import { useButton } from '@mui/material';

let scriptLoading = false;
let scriptLoaded = false;
let scriptDidError = false;

export default class ReactStripeCheckout extends React.Component {
  static defaultProps = {
    className: 'StripeCheckout',
    label: 'Pay With Card',
    locale: 'auto',
    ComponentClass: 'span',
    reconfigureOnUpdate: false,
    triggerEvent: 'onClick',
  };

  static propTypes = {
    // Opens / closes the checkout modal by value
    // WARNING: does not work on mobile due to browser security restrictions
    // NOTE: Must be set to false when receiving token to prevent modal from
    //       opening automatically after closing
    desktopShowModal: PropTypes.bool,

    triggerEvent: PropTypes.oneOf(['onClick', 'onTouchTap', 'onTouchStart']),

    // If included, will render the default blue button with label text.
    // (Requires including stripe-checkout.css or adding the .styl file
    // to your pipeline)
    label: PropTypes.string,

    // Custom styling for default button
    style: PropTypes.object,
    // Custom styling for <span> tag inside default button
    textStyle: PropTypes.object,

    // Prevents any events from opening the popup
    // Adds the disabled prop to the button and adjusts the styling as well
    disabled: PropTypes.bool,

    // Named component to wrap button (eg. div)
    ComponentClass: PropTypes.string,

    // Show a loading indicator
    showLoadingDialog: PropTypes.func,
    // Hide the loading indicator
    hideLoadingDialog: PropTypes.func,

    // Run this method when the scrupt fails to load. Will run if the internet
    // connection is offline when attemting to load the script.
    onScriptError: PropTypes.func,

    // Runs when the script tag is created, but before it is added to the DOM
    onScriptTagCreated: PropTypes.func,

    // By default, any time the React component is updated, it will call
    // StripeCheckout.configure, which may result in additional XHR calls to the
    // stripe API.  If you know the first configuration is all you need, you
    // can set this to false.  Subsequent updates will affect the StripeCheckout.open
    // (e.g. different prices)
    reconfigureOnUpdate: PropTypes.bool,

    // =====================================================
    // Required by stripe
    // see Stripe docs for more info:
    //   https://stripe.com/docs/checkout#integration-custom
    // =====================================================

    // Your publishable key (test or live).
    // can't use "key" as a prop in react, so have to change the keyname
    stripeKey: PropTypes.string.isRequired,

    // The callback to invoke when the Checkout process is complete.
    //   function(token)
    //     token is the token object created.
    //     token.id can be used to create a charge or customer.
    //     token.email contains the email address entered by the user.
    token: PropTypes.func.isRequired,

    // ==========================
    // Highly Recommended Options
    // ==========================

    // Name of the company or website.
    name: PropTypes.string,

    // A description of the product or service being purchased.
    description: PropTypes.string,

    // A relative URL pointing to a square image of your brand or product. The
    // recommended minimum size is 128x128px. The recommended image types are
    // .gif, .jpeg, and .png.
    image: PropTypes.string,

    // The amount (in cents) that's shown to the user. Note that you will still
    // have to explicitly include it when you create a charge using the API.
    amount: PropTypes.number,

    // Specify auto to display Checkout in the user's preferred language, if
    // available. English will be used by default.
    //
    // https://stripe.com/docs/checkout#supported-languages
    // for more info.
    locale: PropTypes.oneOf([
      'auto', // (Default) Automatically chosen by checkout
      'zh', // Simplified Chinese
      'da', // Danish
      'nl', // Dutch
      'en', // English
      'fr', // French
      'de', // German
      'it', // Italian
      'ja', // Japanease
      'no', // Norwegian
      'es', // Spanish
      'sv', // Swedish
    ]),

    // ==============
    // Optional Props
    // ==============

    // The currency of the amount (3-letter ISO code). The default is USD.
    currency: PropTypes.oneOf([
      'AED',
      'AFN',
      'ALL',
      'AMD',
      'ANG',
      'AOA',
      'ARS',
      'AUD',
      'AWG',
      'AZN',
      'BAM',
      'BBD', // eslint-disable-line comma-spacing
      'BDT',
      'BGN',
      'BIF',
      'BMD',
      'BND',
      'BOB',
      'BRL',
      'BSD',
      'BWP',
      'BZD',
      'CAD',
      'CDF', // eslint-disable-line comma-spacing
      'CHF',
      'CLP',
      'CNY',
      'COP',
      'CRC',
      'CVE',
      'CZK',
      'DJF',
      'DKK',
      'DOP',
      'DZD',
      'EGP', // eslint-disable-line comma-spacing
      'ETB',
      'EUR',
      'FJD',
      'FKP',
      'GBP',
      'GEL',
      'GIP',
      'GMD',
      'GNF',
      'GTQ',
      'GYD',
      'HKD', // eslint-disable-line comma-spacing
      'HNL',
      'HRK',
      'HTG',
      'HUF',
      'IDR',
      'ILS',
      'INR',
      'ISK',
      'JMD',
      'JPY',
      'KES',
      'KGS', // eslint-disable-line comma-spacing
      'KHR',
      'KMF',
      'KRW',
      'KYD',
      'KZT',
      'LAK',
      'LBP',
      'LKR',
      'LRD',
      'LSL',
      'MAD',
      'MDL', // eslint-disable-line comma-spacing
      'MGA',
      'MKD',
      'MMK',
      'MNT',
      'MOP',
      'MRO',
      'MUR',
      'MVR',
      'MWK',
      'MXN',
      'MYR',
      'MZN', // eslint-disable-line comma-spacing
      'NAD',
      'NGN',
      'NIO',
      'NOK',
      'NPR',
      'NZD',
      'PAB',
      'PEN',
      'PGK',
      'PHP',
      'PKR',
      'PLN', // eslint-disable-line comma-spacing
      'PYG',
      'QAR',
      'RON',
      'RSD',
      'RUB',
      'RWF',
      'SAR',
      'SBD',
      'SCR',
      'SEK',
      'SGD',
      'SHP', // eslint-disable-line comma-spacing
      'SLL',
      'SOS',
      'SRD',
      'STD',
      'SVC',
      'SZL',
      'THB',
      'TJS',
      'TOP',
      'TRY',
      'TTD',
      'TWD', // eslint-disable-line comma-spacing
      'TZS',
      'UAH',
      'UGX',
      'USD',
      'UYU',
      'UZS',
      'VND',
      'VUV',
      'WST',
      'XAF',
      'XCD',
      'XOF', // eslint-disable-line comma-spacing
      'XPF',
      'YER',
      'ZAR',
      'ZMW', // eslint-disable-line comma-spacing
    ]),

    // The label of the payment button in the Checkout form (e.g. “Subscribe”,
    // “Pay {{amount}}”, etc.). If you include {{amount}}, it will be replaced
    // by the provided amount. Otherwise, the amount will be appended to the
    // end of your label.
    panelLabel: PropTypes.string,

    // Specify whether Checkout should validate the billing ZIP code (true or
    // false)
    zipCode: PropTypes.bool,

    // Specify whether Checkout should collect the user's billing address
    // (true or false). The default is false.
    billingAddress: PropTypes.bool,

    // Specify whether Checkout should collect the user's shipping address
    // (true or false). The default is false.
    shippingAddress: PropTypes.bool,

    // Specify whether Checkout should validate the billing ZIP code (true or
    // false). The default is false.
    email: PropTypes.string,

    // Specify whether to include the option to "Remember Me" for future
    // purchases (true or false). The default is true.
    allowRememberMe: PropTypes.bool,

    // Specify whether to accept Bitcoin in Checkout. The default is false.
    bitcoin: PropTypes.bool,

    // Specify whether to accept Alipay ('auto', true, or false). The default
    // is false.
    alipay: PropTypes.oneOf(['auto', true, false]),

    // Specify if you need reusable access to the customer's Alipay account
    // (true or false). The default is false.
    alipayReusable: PropTypes.bool,

    // function() The callback to invoke when Checkout is opened (not supported
    // in IE6 and IE7).
    opened: PropTypes.func,

    // function() The callback to invoke when Checkout is closed (not supported
    // in IE6 and IE7).
    closed: PropTypes.func,
  };

  static _isMounted = false;
  private loadPromise: Boolean;

  constructor(propTypes?: any) {
    super(propTypes);
    this.state = {
      open: false,
      buttonActive: false,
    };
    this.render();
  }

  componentDidMount() {
    ReactStripeCheckout._isMounted = true;
    if (scriptLoaded) {
      return this.updateStripeHandler();
    }

    if (scriptLoading) {
      return;
    }

    scriptLoading = true;

    const script = document.createElement('script');
    if (
      typeof ReactStripeCheckout.propTypes.onScriptTagCreated === 'function'
    ) {
      ReactStripeCheckout.propTypes.onScriptTagCreated(script);
    }

    script.src = 'https://checkout.stripe.com/checkout.js';
    script.async = true;

    let loadPromise = (() => {
      let canceled = false;
      const promise = new Promise<void>((resolve, reject) => {
        script.onload = () => {
          scriptLoaded = true;
          scriptLoading = false;
          resolve();
          this.onScriptLoaded();
        };
        script.onerror = (event?): void => {
          scriptDidError = true;
          scriptLoading = false;
          reject(event);
          this.onScriptError();
        };
      });
      const wrappedPromise = new Promise<void>((accept, cancel) => {
        promise.then(() =>
          canceled ? cancel({ isCanceled: true }) : accept()
        ); // eslint-disable-line no-confusing-arrow
        promise.catch((error) =>
          canceled ? cancel({ isCanceled: true }) : cancel(error)
        ); // eslint-disable-line no-confusing-arrow
      });

      return {
        promise: wrappedPromise,
        cancel() {
          canceled = true;
        },
      };
    })();

    loadPromise.promise.then(this.onScriptLoaded).catch(this.onScriptError);

    document.body.appendChild(script);
  }

  componentDidUpdate() {
    if (!scriptLoading) {
      this.updateStripeHandler();
    }
  }

  componentWillUnmount() {
    ReactStripeCheckout._isMounted = false;
    if (this.loadPromise) {
      ReactStripeCheckout.propTypes.closed;
    }
    if (
      ReactStripeCheckout.propTypes.stripeKey &&
      ReactStripeCheckout.propTypes.opened
    ) {
      ReactStripeCheckout.propTypes.closed;
    }
  }

  onScriptLoaded = () => {
    if (!ReactStripeCheckout.propTypes.stripeKey) {
      ReactStripeCheckout.propTypes.stripeKey = {
        key: ReactStripeCheckout.propTypes.stripeKey,
      };
      if ((this.loadPromise = true)) {
        this.showStripeDialog();
      }
    }
  };

  onScriptError = () => {
    this.hideLoadingDialog();
    if (ReactStripeCheckout.propTypes.onScriptError) {
      ReactStripeCheckout.propTypes.onScriptError.disabled;
    }
  };

  onClosed = () => {
    if (ReactStripeCheckout._isMounted) this.setState({ open: false });
    if (ReactStripeCheckout.propTypes.closed) {
      ReactStripeCheckout.propTypes.closed.apply(this);
    }
  };

  onOpened = () => {
    this.setState({ open: true });
    if (ReactStripeCheckout.propTypes.opened) {
      ReactStripeCheckout.propTypes.opened.apply(this);
    }
  };

  getConfig = () =>
    [
      'token',
      'image',
      'name',
      'description',
      'amount',
      'locale',
      'currency',
      'panelLabel',
      'zipCode',
      'shippingAddress',
      'billingAddress',
      'email',
      'allowRememberMe',
      'bitcoin',
      'alipay',
      'alipayReusable',
    ].reduce(
      (config, key) =>
        Object.assign(
          {},
          config,
          this.props.hasOwnProperty(key) && {
            [key]: ReactStripeCheckout.propTypes.stripeKey,
          }
        ),
      {
        opened: this.onOpened,
        closed: this.onClosed,
      }
    );

  updateStripeHandler() {
    if (
      !ReactStripeCheckout.propTypes.onScriptError ||
      ReactStripeCheckout.propTypes.reconfigureOnUpdate
    ) {
      ReactStripeCheckout.propTypes.stripeKey =
        ReactStripeCheckout.propTypes.token({
          key: ReactStripeCheckout.propTypes.stripeKey,
        });
    }
  }

  showLoadingDialog() {
    if (ReactStripeCheckout.propTypes.showLoadingDialog) {
      ReactStripeCheckout.propTypes.showLoadingDialog.apply(this);
    }
  }

  hideLoadingDialog() {
    if (ReactStripeCheckout.propTypes.hideLoadingDialog) {
      ReactStripeCheckout.propTypes.hideLoadingDialog.apply(this);
    }
  }

  showStripeDialog() {
    this.hideLoadingDialog();
    ReactStripeCheckout.propTypes.opened(this.getConfig());
  }

  onClick = () => {
    // eslint-disable-line react/sort-comp
    if (ReactStripeCheckout.propTypes.disabled) {
      return;
    }

    if (scriptDidError) {
      try {
        throw new Error(
          'Tried to call onClick, but StripeCheckout failed to load'
        );
      } catch (x) {} // eslint-disable-line no-empty
    } else if (ReactStripeCheckout.propTypes.desktopShowModal) {
      this.showStripeDialog();
    } else {
      this.showLoadingDialog();
      let hasPendingClick = true;
    }
  };

  handleOnMouseDown = () => {
    this.setState({
      buttonActive: true,
    });
  };

  handleOnMouseUp = () => {
    this.setState({
      buttonActive: false,
    });
  };

  renderDefaultStripeButton() {
    return (
      <button
        {...{
          [ReactStripeCheckout.propTypes.triggerEvent]: this.onClick,
        }}
        className={ReactStripeCheckout.defaultProps.className}
        onMouseDown={this.handleOnMouseDown}
        onFocus={this.handleOnMouseDown}
        onMouseUp={this.handleOnMouseUp}
        onMouseOut={this.handleOnMouseUp}
        onBlur={this.handleOnMouseUp}
        style={Object.assign(
          {},
          {
            overflow: 'hidden',
            display: 'inline-block',
            background: 'linear-gradient(#28a0e5,#015e94)',
            border: 0,
            padding: 1,
            textDecoration: 'none',
            borderRadius: 5,
            boxShadow: '0 1px 0 rgba(0,0,0,0.2)',
            cursor: 'pointer',
            visibility: 'visible',
            userSelect: 'none',
          },
          <button type="submit"></button> && {
            background: '#005d93',
          },
          ReactStripeCheckout.propTypes.style
        )}
      >
        <span
          style={Object.assign(
            {},
            {
              backgroundImage: 'linear-gradient(#7dc5ee,#008cdd 85%,#30a2e4)',
              fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
              fontSize: 14,
              position: 'relative',
              padding: '0 12px',
              display: 'block',
              height: 30,
              lineHeight: '30px',
              color: '#fff',
              fontWeight: 'bold',
              boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
              textShadow: '0 -1px 0 rgba(0,0,0,0.25)',
              borderRadius: 4,
            },
            <button type="submit"></button> && {
              color: '#eee',
              boxShadow: 'inset 0 1px 0 rgba(0,0,0,0.1)',
              backgroundImage: 'linear-gradient(#008cdd,#008cdd 85%,#239adf)',
            },
            ReactStripeCheckout.propTypes.textStyle
          )}
        >
          {ReactStripeCheckout.propTypes.label}
        </span>
      </button>
    );
  }

  renderDisabledButton() {
    return (
      <button
        disabled
        style={{
          background: 'rgba(0,0,0,0.2)',
          overflow: 'hidden',
          display: 'inline-block',
          border: 0,
          padding: 1,
          textDecoration: 'none',
          borderRadius: 5,
          userSelect: 'none',
        }}
      >
        <span
          style={{
            boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.25)',
            fontFamily: '"Helvetica Neue",Helvetica,Arial,sans-serif',
            fontSize: 14,
            position: 'relative',
            padding: '0 12px',
            display: 'block',
            height: 30,
            lineHeight: '30px',
            borderRadius: 4,
            color: '#999',
            background: '#f8f9fa',
            textShadow: '0 1px 0 rgba(255,255,255,0.5)',
          }}
        >
          {ReactStripeCheckout.propTypes.label}
        </span>
      </button>
    );
  }

  render() {
    if (
      ReactStripeCheckout.propTypes.desktopShowModal === true &&
      !ReactStripeCheckout.propTypes.opened
    ) {
      this.onClick();
    } else if (
      ReactStripeCheckout.propTypes.desktopShowModal === false &&
      ReactStripeCheckout.propTypes.opened
    ) {
      ReactStripeCheckout.propTypes.token[Symbol.hasInstance];
    }

    const { ComponentClass } = ReactStripeCheckout.propTypes;
    if (this.props.children) {
      return (
        <ComponentClass
          {...{
            [ComponentClass.triggerEvent]: this.onClick,
          }}
          children={this.props.children}
        />
      );
    }
    return ComponentClass.disabled
      ? this.renderDisabledButton()
      : this.renderDefaultStripeButton();
  }
}
