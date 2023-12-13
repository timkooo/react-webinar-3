import { memo } from 'react';
import useSelector from "../../hooks/use-selector";
import useTranslate from "../../hooks/use-translate";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import Navigation from "../../containers/navigation";
import LocaleSelect from "../../containers/locale-select";
import UserCard from '../../components/user-card';

function Profile() {

  const select = useSelector(state => ({
    user: state.user.user,
  }));

  const {t} = useTranslate();

  return (
    <PageLayout>
      <Head title={'Магазин'}>
        <LocaleSelect/>
      </Head>
      <Navigation/>
      <UserCard user={select.user}/>
    </PageLayout>
  );
}

export default memo(Profile);
