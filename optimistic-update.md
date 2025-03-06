# react-query-crash-course

## Optimistic Updates

Optimistic Updates are a pattern where the UI is updated immediately after a user action (e.g., clicking a button), assuming the server request will succeed. If the request eventually fails, the UI is rolled back to its previous state. This creates the illusion of instant responsiveness, improving the user experience (UX) by eliminating perceived latency.

- Key Idea: "Optimistically" reflect changes in the UI before the server confirms success.

- Contrast with Pessimistic Updates: Waiting for the server response before updating the UI.

> ### Why is that called "optimistic"

Maybe because you're optimistically assuming the mutation will succeed, so you update the UI immediately without waiting for the server response. That makes sense because waiting for the server can make the app feel slow. By updating the UI right away, the user gets instant feedback, which is better for user experience. But what if the server request fails? Then you have to roll back the change. So optimistic updates require handling both success and failure scenarios.

> ### Why use optimistic updates

The main reason must be to improve perceived performance. If the UI waits for the server response, there's a delay, even if it's just a few hundred milliseconds. By updating immediately, the app feels faster. But this comes with the complexity of handling possible failures and rolling back changes. So the trade-off is between user experience and code complexity.

The key parts are using `onMutate` to apply the optimistic update, `onError` to roll back, and `onSettled` to refetch data to ensure consistency. The `queryClient` methods like `cancelQueries`, `getQueryData`,`setQueryData` are important here.

> ### How TanStack Query Implements Optimistic Updates

TanStack Query provides lifecycle hooks in useMutation to manage optimistic updates:

| Hook        | Hook    |
| --------    | ------- |
| `onMutate`  | Capture the current state (for rollback) and optimistically update the UI.    |
| `onError`  | Roll back the UI if the mutation fails.     |
| `onSettled`  | Sync with the server (e.g., refetch data to ensure consistency).   |

> #### Step-by-Step Example: Optimistic Todo Toggle

Let’s implement a todo toggle that updates optimistically.

```jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

const TodoList = () => {
  const queryClient = useQueryClient();

  // Mutation to toggle todo completion status
  const { mutate } = useMutation({
    mutationFn: async (updatedTodo) => {
      const response = await axios.put(`/todos/${updatedTodo.id}`, updatedTodo);
      return response.data;
    },
    onMutate: async (updatedTodo) => {
      // 1. Cancel outgoing queries to prevent race conditions
      await queryClient.cancelQueries(['todos']);

      // 2. Save previous todos for rollback
      const previousTodos = queryClient.getQueryData(['todos']);

      // 3. Optimistically update the todos list
      queryClient.setQueryData(['todos'], (oldTodos) =>
        oldTodos.map((todo) =>
          todo.id === updatedTodo.id ? { ...todo, completed: updatedTodo.completed } : todo
        )
      );

      // 4. Return context for rollback
      return { previousTodos };
    },
    onError: (error, updatedTodo, context) => {
      // 5. Rollback on error
      queryClient.setQueryData(['todos'], context.previousTodos);
      alert('Failed to update todo!');
    },
    onSettled: () => {
      // 6. Refetch todos to ensure server-state consistency
      queryClient.invalidateQueries(['todos']);
    },
  });

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id}>
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => mutate({ ...todo, completed: !todo.completed })}
          />
          {todo.title}
        </li>
      ))}
    </ul>
  );
};

```

#### Breakdown of the Workflow

1. User Toggles a Todo:
    - The checkbox updates immediately (optimistic UI).

2. `onMutate` Lifecycle:

    - Cancel ongoing todos queries to avoid stale data overwrites.

    - Save the current state (previousTodos) for potential rollback.

    - Update the cache optimistically using setQueryData.

3. Server Request:

    - The mutationFn sends a PUT request to the server.

4. Success:

    - `onSettled` triggers a refetch to sync with the server (optional but recommended).

5. Failure:

    - `onError` rolls back the UI using previousTodos.

    - An error message alerts the user.

> ### When to Use Optimistic Updates

**High-Success-Rate Actions**: Toggling a todo, liking a post, adding to a cart.

**Non-Critical Actions**: Where a rollback is acceptable if the server fails.

**User-Driven Interactions**: Actions where immediate feedback is crucial (e.g., drag-and-drop reordering).

>### Potential Pitfalls

**Race Conditions**: Multiple mutations conflicting (solved by cancelQueries in onMutate).

**Complex Rollback Logic**: Requires careful state management.

**Overuse**: Not all actions need optimistic updates (e.g., deleting critical data).