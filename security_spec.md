# Security Specification: QAIYRYM Music School

## Data Invariants
1. A **User** profile must correspond to a valid Telegram ID validated via HMAC on the server.
2. A user can only view **Lessons** for courses they have successfully enrolled in (present in `enrolledCourses` array).
3. **Courses** are read-only for public/students. Only admins (specialized check) can modify them.
4. Users can only update their own profile fields, excluding `enrolledCourses` which is handled by enrollment logic.

## The Dirty Dozen Payloads (Targeting Rejection)

1. **Identity Theft**: Attempting to create a user profile with another user's `telegramId`.
2. **Ghost Enrollment**: Updating `enrolledCourses` directly from the client without a verified payment/admin hook.
3. **Privilege Escalation**: Adding `isAdmin: true` to a user profile.
4. **ID Poisoning**: Using a 1MB string as a `courseId`.
5. **Shadow Field Injection**: Adding `discountCode: "FREE"` to a create user request.
6. **State Skip**: Marking a lesson as `completed: true` for a course not owned.
7. **Future Dating**: Setting `createdAt` to a future timestamp.
8. **PII Scraping**: Trying to list all `users` as an unauthenticated guest.
9. **Atomic Bypass**: Creating an enrollment record without checking if the course exists.
10. **Resource Exhaustion**: Sending a payload with 10k items in an array.
11. **Spoofed Update**: Changing `telegramId` on an existing profile.
12. **Unauthorized Metadata**: Attempting to delete a course.

## Logic Gates
- `isValidUser()`: Checks strict keys for user profile.
- `isOwner(userId)`: Verifies `request.auth.uid == userId`.
- `isEnrolled(courseId)`: Checks if `courseId` is in user's doc.
