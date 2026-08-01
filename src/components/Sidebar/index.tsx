import { FC } from 'react';
import useSidebar from '@app/hooks/useSidebar';
import { Backdrop, Content } from './styles';

type Props = {
  children: React.ReactNode;
  className?: string;
};

const Sidebar: FC<Props> = ({ children, className }) => {
  const { open, close } = useSidebar((state) => state);

  return (
    <>
      <Backdrop onClick={close} $open={open} />
      <Content $open={open} id="sidebar" aria-label="sidebar" className={className}>
        {children}
      </Content>
    </>
  );
};

export default Sidebar;
