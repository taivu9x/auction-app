import { Children } from '@/common/types';
import React from 'react';

export type ServerSidePropNames = 'profile';

export type ServerSidePropsState = Partial<Record<ServerSidePropNames, any>>;

type ServerSidePropsProviderValue = {
  props: ServerSidePropsState;
};

export const ServerSidePropsContext = React.createContext<ServerSidePropsProviderValue>({
  props: {},
});

type Props = Children & { props: Partial<ServerSidePropsState> };

export const ServerSidePropsProvider = ({ children, props = {} }: Props) => {
  const value = React.useMemo(() => ({ props }), [props]);

  return (
    <ServerSidePropsContext.Provider value={value}>{children}</ServerSidePropsContext.Provider>
  );
};

export const useServerSidePropsContext = () => React.useContext(ServerSidePropsContext);
