"use client";

import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import { Pagination } from "@nextui-org/pagination";
import { Chip, Select, SelectItem } from "@nextui-org/react";
import Link from "next/link";

import { AdOrdersListResponse } from "@/src/types/interface/orders.interface";
import { toastError } from "@/src/utils/toast-error";
import Loader from "@/src/components/ui/Loader";
import { limitPages } from "@/src/types/types/limitPages";
import { PaginationComponent } from "@/src/components/ui/PaginationComponent";
import ordersService from "@/src/services/orders/orders.service";

export default function AdOrders() {
  const [data, setData] = useState<AdOrdersListResponse | undefined>(undefined);
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);
  const pages = Math.ceil((data?.count || 0) / limit);

  //TODO: Переписать на useQuery, как в номенклатурах
  const fetchAdOrders = async (page: number, limit: number) => {
    try {
      const res = await ordersService.advertising().gatAll({ page, limit });

      if (res) {
        setData(res.data);
      }
    } catch (error) {
      toastError(error);
    }
  };

  useEffect(() => {
    fetchAdOrders(page, limit);
  }, [page, limit]);

  if (!data) {
    return <Loader />;
  }

  return (
    <div>
      <Table
        isHeaderSticky
        bottomContent={
          <PaginationComponent
            limit={limit}
            page={page}
            total={pages}
            onLimitChange={setLimit}
            onPageChange={setPage}
          />
        }
      >
        <TableHeader>
          <TableColumn>Название</TableColumn>
          <TableColumn>Группа</TableColumn>
          <TableColumn>Файл</TableColumn>
          <TableColumn>Слайды</TableColumn>
          <TableColumn>Интервал</TableColumn>
        </TableHeader>
        <TableBody>
          {data?.results.map((order) => (
            <TableRow key={order.id}>
              <TableCell>
                <Chip color="default" variant="bordered">
                  <Link href={`/orders/${order.id}`} target="_blank">
                    {order.name}
                  </Link>
                </Chip>
              </TableCell>
              <TableCell>
                <Chip color="default" variant="bordered">
                  <Link href={`/groups/${order.group.id}`} target="_blank">
                    {order.group.name}
                  </Link>
                </Chip>
              </TableCell>
              <TableCell>
                <Chip color="default" variant="bordered">
                  <Link href={`/files/${order.file.id}`} target="_blank">
                    {order.file.name}
                  </Link>
                </Chip>
              </TableCell>
              <TableCell>{order.slides}</TableCell>
              <TableCell>
                {order.broadcastInterval.since}, {order.broadcastInterval.until}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
