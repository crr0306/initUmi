import { PureComponent } from 'react';
import { connect } from 'dva';
import Header from './components/header';
import Content from './components/content';
import FooterTable from './components/footer';

class Index extends PureComponent {

    render() {
        return (
            <div
             
            >
                <Header />
                <Content />
                <FooterTable />
            </div>
        );
    }
}

export default connect(({ githubPro, loading }) => {
    return {
        loading: loading.models.github
    };
})(Index);