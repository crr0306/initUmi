import React, { PureComponent } from 'react';
import { Link } from 'umi';
import styles from './index.less';
import { Button } from 'antd';
import config from './typeConfig';
/*
   userInfo :从global中的state获取，而第一次请求是从第一次加载layout
 */


class Exception extends PureComponent {
    static defaultProps = {
        backText: 'back to home',
        redirect: {
            pathname: '/sys'
        },
    };
    constructor(props) {
        super(props);
        this.state = {
        };
    }


    render() {
        console.log("props  in exception:", this.props);
        const {
            backText,
            type,
            title,
            desc,
            redirect,
            img
        } = this.props;
        console.log("config  in exception:", config);
        const pageType = type in config ? type : '404';
        console.log("pageType  in exception:", config[pageType].img);
        return (
            <div className={styles.exception}>
                <div className={styles.imgBlock}>
                    <div
                        className={styles.imgEle}
                        style={{ backgroundImage: `url(${img || config[pageType].img})` }}
                    />
                </div>
                <div className={styles.content}>
                    <h1>{title || config[pageType].title}</h1>
                    <div className={styles.desc}>{desc || config[pageType].desc}</div>
                    <div className={styles.actions}>
                        <Link to={redirect}>
                            <Button type="primary">{backText}</Button>
                        </Link>
                    </div>
                </div>

            </div>
        );

    }
}

export default Exception;