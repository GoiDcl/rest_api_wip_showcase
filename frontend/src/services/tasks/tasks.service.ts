//TODO: Переписать на классы

import { API_URL } from "@/src/config/api.config";
import {
  TaskListResponse,
  TasksListResponseDTO,
} from "@/src/types/interface/tasks.interface";
import { taskResponseTransformer } from "@/src/types/transformers/tasks.transforems";

interface Pagination {
  page?: number;
  limit?: number;
}

export const TasksService = {
  async getAll(props: Pagination): Promise<TaskListResponse> {
    const { page, limit } = props;
    let url = `${API_URL}/tasks/`;

    if (page !== undefined) {
      url += `?page=${page}`;
    }
    if (limit !== undefined) {
      url += `&limit=${limit}`;
    }
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.ok) {
      const data: TasksListResponseDTO = await response.json(); // Используем TasksListResponseDTO для данных из API

      return taskResponseTransformer(data); // Преобразуем данные в TaskListResponse
    } else {
      throw new Error("Не удалось получить список задач");
    }
  },
};
