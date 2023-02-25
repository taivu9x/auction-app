import { AuthProvider } from "@/packages/common/hooks/useAuth";
import AdminLayout from "@/packages/layout/AdminLayout";
import { ListItem } from "@/packages/ListItems";
import { useEffect, useState } from "react";
import { Item } from "@/packages/common/types/item";
import { getListItemApi } from "@/packages/rest/private/items";

export default function Home() {
  const [listItem, setListItem] = useState<Item[]>([]);

  const getListItem = async () => {
    const res = await getListItemApi();
    setListItem(res);
  };

  useEffect(() => {
    getListItem();
  }, []);

  return (
    <AuthProvider>
      <AdminLayout>
        <ListItem data={listItem} />
      </AdminLayout>
    </AuthProvider>
  );
}
