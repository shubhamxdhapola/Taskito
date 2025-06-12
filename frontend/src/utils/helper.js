import { toast } from 'react-hot-toast'

export const validateLoginForm = (email, password) => {
    if (!email.trim()) return toast.error("Email is required");
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        return toast.error("Invalid email format");
    if (!password.trim()) return toast.error("Password is required");
    return true;
};

export const validateSignUpForm = (name, email, password) => {
    if (!name.trim()) return toast.error("Full name is required")
    if (!email.trim()) return toast.error("Email is required");
    if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email))
        return toast.error("Invalid email format");
    if (!password.trim()) return toast.error("Password is required");
    return true;
};

export const greetUser = () => {
    const now = new Date()
    const hours = now.getHours()

    if (hours > 5 && hours < 12) return 'Good Morning'
    else if (hours > 12 && hours < 17) return 'Good Afternoon'
    else if (hours > 17 && hours < 21) return 'Good Evening'
    else return 'Good Night'
}

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return ""

    const [integerPart, fractionalPart] = num.toString().split(".")
    const fromattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",")

    return fractionalPart
        ? `${fromattedInteger}.${fractionalPart}`
        : fromattedInteger
}

export const validateCreateTaskForm = (title, description, priority, dueDate, assignedTo, todoChecklist) => {

    if (!title.trim()) return toast.error("Title is required")
    if (!description.trim()) return toast.error("Description is required")
    if (!priority.trim()) return toast.error("Priority is required")
    if (!dueDate.trim()) return toast.error("Due date is required")
    if (assignedTo.length === 0) return toast.error("Task not assigned to any member")
    if (todoChecklist.length === 0) return toast.error("Add atleast one todo task")
    return true
}