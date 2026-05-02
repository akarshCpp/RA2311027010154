# Notification System Design

## Stage 1: Priority Inbox Maintenance

### Priority Logic
Notifications are ranked based on a combination of their weight and recency. 
1. **Weight**: We assigned explicit priorities to the notification types:
   - `Placement` -> High Priority (Weight: 3)
   - `Result` -> Medium Priority (Weight: 2)
   - `Event` -> Low Priority (Weight: 1)
2. **Recency**: When two notifications share the exact same weight, the tie is broken by looking at their timestamps, giving preference to the more recent notification.

### Efficient Maintenance of the Top 10
As new notifications continuously stream into the system, sorting the entire list every time is computationally expensive `O(N log N)`. 

To maintain the top 10 efficiently, we use a **Min-Heap (Priority Queue)** of size `K = 10`.
1. We initialize a Min-Heap and insert the first 10 incoming notifications.
2. For every subsequent incoming notification, we compare its priority to the root of the Min-Heap (which represents the 10th most important notification in our subset).
3. If the new notification's priority is greater than the root, we extract the root and insert the new notification. 
4. If it is less, we simply ignore it.

This approach guarantees that the time complexity for processing each new incoming notification is `O(log K)`. Since `K` is a constant `10`, the insertion operation operates in **`O(1)`** constant time, allowing the system to scale flawlessly regardless of how many millions of notifications stream in.
