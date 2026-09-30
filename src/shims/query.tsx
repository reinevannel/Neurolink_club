import { useState } from "react";

export function useMutation<T>({
  mutationFn,
  onSuccess,
}: {
  mutationFn: () => Promise<T>;
  onSuccess?: (result: T) => void;
}) {
  const [isPending, setPending] = useState(false);
  return {
    isPending,
    mutate() {
      setPending(true);
      void mutationFn()
        .then((result) => onSuccess?.(result))
        .finally(() => setPending(false));
    },
  };
}
