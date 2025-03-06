# useMutation hook from React Query

useMutation is used for making POST, PUT, DELETE requests, or any operation that changes server-side data. Unlike useQuery, which is for fetching data, mutations are about modifying data.

## Basic Structure

```javascript

const { 
  data,        // Result from successful mutation
  error,       // Error object if mutation fails
  isIdle,      // True before mutation is triggered
  mutate,      // Function to trigger mutation
  mutateAsync  // Promise-based mutation trigger
} = useMutation({
  mutationFn,   // (Required) Function performing async operation
  mutationKey,  // Optional key for internal tracking
  onError,      // Error handler
  onMutate,     // Called before mutation starts
  onSettled,    // Called after success/error
  onSuccess,    // Success handler
});

```javascript

## Parameters Explained & Return Values

### `mutationFn` (Required)

The function that performs the asynchronous operation (e.g., API call).

#### Example 1

```javascript

const addTodo = async (newTodo) => {
  const response = await axios.post('/api/todos', newTodo);
  return response.data; // Returned data populates `data` variable
};

```

### `mutationKey` (Optional)

A unique identifier for the mutation. Useful for debugging or interacting with the mutation cache.

### Lifecycle Handlers

- `onMutate`: Runs before the mutation. Useful for optimistic updates.

- `onSuccess`: Runs after a successful mutation. Receives mutation result and variables.

- `onError`: Runs if the mutation fails. Receives error and variables.

- `onSettled`: Runs after either success or failure. Useful for cleanup.

### Return Values

| Value       | Description    |
| --------    | ------- |
| `data`  | Result from the last successful mutation.|
| `data`  | Error object if the mutation failed.|
| `isIdle`  | `true` before the mutation is triggered.|
| `mutate`  | Function to trigger the mutation (fire-and-forget).|
| `mutateAsync`  | Function to trigger the mutation and return a promise.|

### Best Practices

- Use `onMutate` for optimistic updates.

- Use `onSettled` for cleanup or refetching fresh data.

- Prefer `mutateAsync` when you need to handle the result immediately.

- Use `mutationKey` to debug or interact with the mutation later (e.g., `queryClient.getMutationState(mutationKey)`).

### Example: Basic Todo Creation

```javascript
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

function TodoForm() {
  const { data, error, isIdle, mutate } = useMutation({
    mutationFn: (newTodo) => axios.post('/api/todos', newTodo),
    onSuccess: (data) => {
      console.log('Todo created:', data);
    },
    onError: (error) => {
      console.error('Error creating todo:', error);
    },
  });

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const newTodo = { title: formData.get('title') };
    mutate(newTodo); // Trigger the mutation
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input name="title" />
        <button type="submit">Add Todo</button>
      </form>
      {isIdle && <p>Submit a new todo.</p>}
      {data && <p>Todo added: {data.title}</p>}
      {error && <p style={{ color: 'red' }}>{error.message}</p>}
    </div>
  );
}

```

### Example: Optimistic Update

```javascript
const { mutate } = useMutation({
  mutationFn: updateTodo,
  onMutate: async (updatedTodo) => {
    // Cancel outgoing queries for todos to prevent race conditions
    await queryClient.cancelQueries(['todos']);

    // Snapshot previous todos for rollback on error
    const previousTodos = queryClient.getQueryData(['todos']);

    // Optimistically update the todos list
    queryClient.setQueryData(['todos'], (old) =>
      old.map((todo) => (todo.id === updatedTodo.id ? updatedTodo : todo))
    );

    // Return context for rollback
    return { previousTodos };
  },
  onError: (error, updatedTodo, context) => {
    // Rollback on error
    queryClient.setQueryData(['todos'], context.previousTodos);
    alert('Failed to update todo: ' + error.message);
  },
  onSettled: () => {
    // Refetch todos to ensure data is fresh
    queryClient.invalidateQueries(['todos']);
  },
});

// Usage:
mutate({ id: 1, title: 'Updated Todo' });

```

## `mutate`

```

mutate:  (variables:TVariables, { onSuccess, onSettled, onError }) => void
- The mutation function you can call with variables to trigger the mutation and optionally hooks on additional callback options.
- variables: TVariables
    - Optional
    - The variables object to pass to the mutationFn.

```

### Clarifying the Line

"The mutation function you can call with variables to trigger the mutation and optionally hooks on additional callback options."

#### This means

- mutate is a function that you call to start the mutation (e.g., sending data to a server).

- Variables are input data you pass to the mutation (e.g., { title: "Buy milk" } for creating a todo).

- Optionally, you can pass callbacks (like onSuccess, onError) to handle side effects for that specific mutate call.

#### Example

```javascript
mutate(
  { title: "Buy milk" }, // Variables (input data)
  {
    onSuccess: (data) => console.log("Todo created:", data),
    onError: (error) => console.error("Error:", error),
  }
);
```

### Understanding Variables

#### What Are Variables

- Variables are the input data your mutation needs to perform its task. For example:

- To create a todo, you need a title and description.

- To delete a todo, you need an id.

#### Why Use Variables

- **Dynamic Data**: Mutations often depend on user input (e.g., form data).

- **Reusability**: The same mutation function can handle different data (e.g., updating todos with different IDs).

#### How to Use Variables

- Variables are passed as the first argument to mutate, and they flow into your mutationFn.

#### Example 1: Creating a Todo

```javascript
// Define mutation
const { mutate } = useMutation({
  mutationFn: (newTodo) => axios.post("/todos", newTodo),
});

// Trigger mutation with variables
mutate({ title: "Learn React", completed: false });
```

Here, `{ title: "Learn React", completed: false } `is the **variables** object passed to the `mutationFn`.

#### Example 2: Deleting a Todo

```javascript
const { mutate } = useMutation({
  mutationFn: (todoId) => axios.delete(`/todos/${todoId}`),
});

// Trigger mutation with variables
mutate(123); // Delete todo with ID 123
```



### Key Scenarios

#### Variables Are Optional

Some mutations don’t require input (e.g., fetching a random quote):

```javascript
const { mutate } = useMutation({
  mutationFn: () => axios.get("/random-quote"),
});

// Trigger mutation without variables
mutate();
```
#### Using Callbacks with Variables

You can pass callbacks along with variables to handle success, error, or cleanup:

```javascript
mutate(
  { title: "Buy milk" },
  {
    onSuccess: (data, variables) => {
      // `variables` = { title: "Buy milk" }
      console.log("Created todo with title:", variables.title);
    },
  }
);
```
#### Dynamic Variables

Variables can come from user input (e.g., form fields):

```javascript
const [input, setInput] = useState("");

const handleSubmit = () => {
  mutate({ title: input }); // Use input state as variables
};
```

#### Common Pitfalls

1. **Mismatched Variables and `mutationFn`**

If your `mutationFn` expects an object but you pass a primitive:

```javascript
// ❌ Wrong: `mutationFn` expects a todo object
mutate("Buy milk");

// ✅ Correct
mutate({ title: "Buy milk" });
```

2. **Undefined Variables**

If your mutationFn requires variables but they’re not provided:
```javascript
// ❌ Fails: `mutationFn` expects `todoId`
mutate();

// ✅ Correct
mutate(123);
```

## Deep Dive: `mutate` vs `mutateAsync` in TanStack Query

### Key Differences

| Feature        | `mutate`    | `mutateAsync` |
| -------------- | ----------- | ------------- |
| **Return Type** | `void` (no promise) | `Promise` |
| **Error Handling** | Uses `onError` callback | Uses `try/catch` or `.catch()` |
| **Flow Control** | Fire-and-forget | `await`-able or promise-chaining |
| **Usage** | Simple actions with callbacks | Sequential logic or inline error handling |

### When to Use Each

1. Use mutate When

    - You want a fire-and-forget approach (e.g., submitting a form and showing a toast).

    - Handling results via lifecycle callbacks (onSuccess, onError, onSettled).

    - Triggering mutations without needing to wait for the outcome.

2. Use mutateAsync When:

    - You need to wait for the mutation result (e.g., navigating after success).

    - Handling errors inline with try/catch or promise chaining.

    - Performing sequential mutations (e.g., mutation A → mutation B).

### How to Use Them

#### Basic mutate with Callbacks

```javascript
const { mutate } = useMutation({
  mutationFn: addTodo,
  onSuccess: (data) => {
    console.log("Todo added:", data);
    queryClient.invalidateQueries(["todos"]);
  },
  onError: (error) => {
    console.error("Error:", error);
  },
});

// Fire-and-forget
const handleSubmit = () => {
  mutate({ title: "New Todo" });
};
```

#### `mutateAsync` with `async/await`

```javascript
const { mutateAsync } = useMutation({
  mutationFn: addTodo,
});

const handleSubmit = async () => {
  try {
    const data = await mutateAsync({ title: "New Todo" });
    console.log("Todo added:", data);
    queryClient.invalidateQueries(["todos"]);
    navigate("/todos"); // Navigate after success
  } catch (error) {
    console.error("Error:", error);
  }
};
```

#### Advanced Usage: Overriding Callbacks with `mutate`

```javascript
mutate(
  { title: "New Todo" },
  {
    onSuccess: (data) => {
      // Overrides the default onSuccess in useMutation
      console.log("Custom success handler:", data);
    },
    onError: (error) => {
      // Overrides the default onError
      console.error("Custom error handler:", error);
    },
  }
);
```

#### Advanced Usage: Combining `mutateAsync` with Promise Chaining

```javascript
mutateAsync({ title: "New Todo" })
  .then((data) => {
    console.log("Success:", data);
  })
  .catch((error) => {
    console.error("Error:", error);
  });
```

#### Handling Loading States: With `mutate` (Using `isLoading` from `useMutation`)

```javascript
const { mutate, isLoading } = useMutation({
  mutationFn: addTodo,
});

return (
  <button onClick={() => mutate({ title: "New Todo" })} disabled={isLoading}>
    {isLoading ? "Adding..." : "Add Todo"}
  </button>
);
```

#### Handling Loading States: With `mutateAsync` (Local State Management)

``` javascript
const [isSubmitting, setIsSubmitting] = useState(false);

const handleSubmit = async () => {
  setIsSubmitting(true);
  try {
    await mutateAsync({ title: "New Todo" });
  } finally {
    setIsSubmitting(false);
  }
};

return (
  <button onClick={handleSubmit} disabled={isSubmitting}>
    {isSubmitting ? "Adding..." : "Add Todo"}
  </button>
);
```

#### Error Handling Scenarios: Global Error Handling with mutate

```javascript
const { mutate } = useMutation({
  mutationFn: addTodo,
  onError: (error) => {
    // Global error handling (e.g., show toast)
    toast.error(error.message);
  },
});
```

#### Error Handling Scenarios:  Localized Error Handling with mutateAsync

```javascript
const handleSubmit = async () => {
  try {
    await mutateAsync({ title: "New Todo" });
  } catch (error) {
    // Handle specific UI logic (e.g., highlight form field)
    setFieldError("title", error.message);
  }
};
```

#### Sequencing Mutations: Using mutateAsync for Sequential Logic

```javascript
const handleWorkflow = async () => {
  try {
    const user = await createUserAsync({ name: "Alice" });
    const profile = await createProfileAsync({ userId: user.id });
    console.log("Workflow complete:", profile);
  } catch (error) {
    console.error("Workflow failed:", error);
  }
};
```

#### Best Practices

- **Use `mutate`** for simple actions where you don’t need to wait for the result.

- **Use `mutateAsync`** for complex workflows requiring sequential logic or inline error handling.

- **Avoid mixing callbacks and promises** (e.g., don’t use `onSuccess` with `mutateAsync` and `.then()`).

- **Clean up pending promises** if the component unmounts (e.g., using AbortController).

#### When to Avoid

- Avoid `mutate` if you need to perform an action immediately after the mutation (e.g., closing a modal after submission). Without a promise, you can’t guarantee timing.

- Avoid `mutateAsync` for simple cases where callbacks suffice (e.g., logging analytics on success). It adds unnecessary complexity.

### mutate: For Simple Fire-and-Forget Actions

#### When to Use

- When you **don’t need to wait** for the mutation result to perform subsequent actions.

- When side effects (e.g., showing a toast, refreshing data) can be handled via **callbacks** (`onSuccess`, `onError`).

- For non-critical UI updates (e.g., liking a post, toggling a checkbox).

#### Example 1: Liking a Post

```javascript
const { mutate } = useMutation({
  mutationFn: (postId) => axios.post(`/posts/${postId}/like`),
  onSuccess: () => {
    // Refresh the posts list after a successful like
    queryClient.invalidateQueries(["posts"]);
  },
  onError: (error) => {
    toast.error("Failed to like post: " + error.message);
  },
});

// Fire-and-forget: No need to wait for the result
const handleLike = (postId) => {
  mutate(postId);
};

```

#### Why mutate?

- The UI updates optimistically (no need to wait for the server response).

- The `onSuccess` callback handles refreshing the data, and `onError` shows a toast. No sequential logic required.


### `mutateAsync`: For Complex Sequential Workflows

#### When to Use

- When you need to wait for the mutation result before proceeding (e.g., redirecting after login).

- For multi-step workflows where one mutation depends on another.

- When you want inline error handling with `try/catch` or promise chaining.

#### Example 1: User Registration → Login → Redirect

```javascript
const { mutateAsync: register } = useMutation({
  mutationFn: (userData) => axios.post("/auth/register", userData),
});

const { mutateAsync: login } = useMutation({
  mutationFn: (credentials) => axios.post("/auth/login", credentials),
});

const handleSignup = async (userData) => {
  try {
    // 1. Register the user
    await register(userData);
    
    // 2. Automatically log them in
    const { token } = await login({
      email: userData.email,
      password: userData.password,
    });

    // 3. Store token and redirect
    localStorage.setItem("token", token);
    redirect("/dashboard");
  } catch (error) {
    toast.error(error.message);
  }
};
```

#### Why mutateAsync?

- Steps 2 (login) depends on Step 1 (registration) succeeding.

- Using await ensures the login only runs after registration completes.

- Inline try/catch handles errors for the entire flow in one place.

#### Example 2: Checkout Process

```javascript
const { mutateAsync: createOrder } = useMutation({
  mutationFn: (orderData) => axios.post("/orders", orderData),
});

const { mutateAsync: clearCart } = useMutation({
  mutationFn: () => axios.delete("/cart"),
});

const handleCheckout = async (orderData) => {
  try {
    // 1. Create the order
    const order = await createOrder(orderData);
    
    // 2. Clear the cart only if the order succeeds
    await clearCart();
    
    // 3. Redirect to order confirmation
    navigate(`/orders/${order.id}`);
  } catch (error) {
    toast.error("Checkout failed: " + error.message);
  }
};
```

#### Why mutateAsync?

- Clearing the cart (clearCart) must wait until the order is successfully created.

- The entire process is treated as a single atomic operation.