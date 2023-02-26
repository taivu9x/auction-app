import { AuthProvider } from "@/packages/common/hooks/useAuth";
import AdminLayout from "@/packages/layout/AdminLayout";
import { ListItem } from "@/packages/ListItems";
import { useCallback, useEffect, useState } from "react";
import { Item, TypeFilter } from "@/packages/common/types/item";
import { getListItemApi, publishItemApi } from "@/packages/rest/private/items";
import { useControlModal } from "@/packages/common/hooks/useModal";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import { Filter } from "@/packages/Filter";

export default function Home() {
  const [listItem, setListItem] = useState<Item[]>([]);
  const { isOpen, openModal, closeModal } = useControlModal();
  const [itemSelected, setItemSelected] = useState<Item>();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    setIsSubmitting(false);
  };

  const getListItem = async (type?: TypeFilter) => {
    const res = await getListItemApi(type);
    setListItem(res);
  };

  useEffect(() => {
    getListItem();
  }, []);

  const handleBid = useCallback((item: Item) => {
    setItemSelected(item);
    openModal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePublish = useCallback(async (item: Item) => {
    await publishItemApi(item.id);
    getListItem();
  }, []);

  return (
    <AuthProvider>
      <AdminLayout>
        <div className="container m-auto">
          <Filter onFilter={getListItem}></Filter>
          <ListItem
            data={listItem}
            onClickBid={handleBid}
            onClickPublish={handlePublish}
          />
        </div>
        <Modal isOpen={isOpen}>
          <h2 className="text-lg font-medium mb-6">Bid {itemSelected?.name}</h2>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="amount" className="block font-medium mb-2">
                Bid Price
              </label>
              <input
                type="number"
                id="amount"
                placeholder="Amount"
                className={`border border-gray-300 rounded-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:ring-opacity-50 ${
                  errors.amount ? "border-red-500" : ""
                } w-full`}
                {...register("amount", {
                  required: true,
                  min: 0,
                })}
              />
              {errors.amount && (
                <p className="text-red-500 mt-2">Please enter a price</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={closeModal}
                className="mr-5 border px-4 py-2 rounded-lg"
              >
                Close
              </button>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                {isSubmitting ? "Biding..." : "Bid"}
              </button>
            </div>
          </form>
        </Modal>
      </AdminLayout>
    </AuthProvider>
  );
}
