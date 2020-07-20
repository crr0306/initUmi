import styles from './index.css';
import LoginLayout from './login'
function globalLayout(props) {
  const { children } = props;
  return (
    <LoginLayout>{children}</LoginLayout>
  );
}

export default globalLayout;
