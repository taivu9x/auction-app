import { AuthProvider } from '@/packages/common/hooks/useAuth';
import AdminLayout from '@/packages/layout/AdminLayout';
import { ListItem } from '@/packages/ListItems';
import { useCallback, useEffect, useState } from 'react';
import { Item, TypeFilter } from '@/packages/common/types/item';
import { bidItemApi, getListItemApi, publishItemApi } from '@/packages/rest/private/items';
import { useControlModal } from '@/packages/common/hooks/useModal';
import Modal from 'react-modal';
import { useForm } from 'react-hook-form';
import { Filter } from '@/packages/Filter';
import useSWR from 'swr';
import { useToast } from '@/common/hooks/useToast';
import { Form } from '@/common/headless/Form';

export default function Home() {
  const { toastError } = useToast();
  const [filter, setFilter] = useState<TypeFilter>();
  const { data: listItem } = useSWR<Item[]>(`/items/${filter}`, () => {
    return getListItemApi(filter);
  });
  const { isOpen, openModal, closeModal } = useControlModal();
  const [itemSelected, setItemSelected] = useState<Item>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const methods = useForm({
    defaultValues: {
      amount: 0,
    },
  });

  const onFilter = useCallback((filter?: TypeFilter) => {
    setFilter(filter);
  }, []);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    if (!itemSelected) {
      setIsSubmitting(false);
      return;
    }

    try {
      await bidItemApi(itemSelected?.id, data);
      closeModal();
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBid = useCallback((item: Item) => {
    setItemSelected(item);
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePublish = useCallback(async (item: Item) => {
    await publishItemApi(item.id);
  }, []);

  return (
    <AuthProvider>
      <AdminLayout>
        <div className='container m-auto'>
          <Filter onFilter={onFilter}></Filter>
          <ListItem data={listItem || []} onClickBid={handleBid} onClickPublish={handlePublish} />
        </div>
        <Modal isOpen={isOpen}>
          <h2 className='text-lg font-medium mb-6'>Bid {itemSelected?.name}</h2>
          <Form methods={methods} onSubmit={onSubmit}>
            <Form.Input
              className='mb-6'
              label='Bid Price'
              name='amount'
              type='number'
              rules={{
                required: {
                  value: true,
                  message: 'Please enter your bid price',
                },
                min: {
                  value: itemSelected?.currentPrice || 0,
                  message: `Please enter a price greater than ${itemSelected?.currentPrice || 0}`,
                },
              }}
            />
            <Form.ErrorMessage name='amount' />
            <div className='flex justify-end'>
              <button onClick={closeModal} className='mr-5 border px-4 py-2 rounded-lg'>
                Close
              </button>
              <button
                type='submit'
                disabled={isSubmitting}
                className='bg-indigo-600 text-white px-4 py-2 rounded-lg'>
                {isSubmitting ? 'Biding...' : 'Bid'}
              </button>
            </div>
          </Form>
        </Modal>
      </AdminLayout>
    </AuthProvider>
  );
}
