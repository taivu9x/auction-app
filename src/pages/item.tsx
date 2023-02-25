import { useState } from "react";
import { Item } from "@/packages/common/types/item";
import { useForm } from "react-hook-form";
import { AuthProvider } from "@/packages/common/hooks/useAuth";
import AdminLayout from "@/packages/layout/AdminLayout";
import { createItemApi } from "@/packages/rest/private/items";
import router from "next/router";

export default function PageItem() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data: any) => {
    await createItemApi(data);
    setIsSubmitting(true);
    setIsSubmitting(false);

    router.push("/");
  };

  return (
    <AuthProvider>
      <AdminLayout>
        <div className="bg-white p-6 rounded-lg w-6/12 m-auto">
          <h2 className="text-lg font-medium mb-6">Create Item</h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="mb-4">
              <label htmlFor="name" className="block font-medium mb-2">
                Name
              </label>
              <input
                className={`border border-gray-300 rounded-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:ring-opacity-50 ${
                  errors.name ? "border-red-500" : ""
                } w-full`}
                placeholder="Name"
                {...register("name", {
                  required: true,
                })}
              />
              {errors.name && (
                <p className="text-red-500 mt-2">Please enter a name</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="currentPrice" className="block font-medium mb-2">
                Current Price
              </label>
              <input
                type="number"
                placeholder="Start Price"
                id="currentPrice"
                className={`border border-gray-300 rounded-sm shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:ring-opacity-50 ${
                  errors.currentPrice ? "border-red-500" : ""
                } w-full`}
                {...register("currentPrice", {
                  required: true,
                })}
              />
              {errors.currentPrice && (
                <p className="text-red-500 mt-2">Please enter a price</p>
              )}
            </div>

            <div className="mb-4">
              <label htmlFor="duration" className="block font-medium mb-2">
                Duration (seconds)
              </label>
              <input
                type="number"
                placeholder="Duration"
                id="duration"
                className={`border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:ring-opacity-50 ${
                  errors.duration ? "border-red-500" : ""
                } w-full`}
                {...register("duration", {
                  required: true,
                })}
              />
              {errors.duration && (
                <p className="text-red-500 mt-2">Please enter a duration</p>
              )}
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-600 text-white px-4 py-2 rounded-lg"
              >
                {isSubmitting ? "Creating..." : "Create"}
              </button>
            </div>
          </form>
        </div>
      </AdminLayout>
    </AuthProvider>
  );
}
