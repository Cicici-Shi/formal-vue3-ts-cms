import { useStore } from "@/store";

export function usePermission(pageName: string, hanldeName: string) {
  const store = useStore();
  const permissions = store.state.login.permissions;
  const verifyPermission = `system:${pageName}:${hanldeName}`;

  // name = "coderwhy"
  // !name -> false
  // !!name -> true 转成布尔值
  return !!permissions.find((item) => item === verifyPermission);
}
