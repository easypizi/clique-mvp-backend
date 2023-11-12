# Maverick API - MVP

Service API which used to control data source and transformation for telegram space management.

---

### Requirements:

- NoSQL DB (currently it works with MongoDB).
- Upload service (I've used Upload.io, but can be replaced with any CDN service).

---

### .ENV

ENV File (should be created and filled with data).

Just copy `.env.example` and fill with real data.

---

## API

Below described all API methods, which were used in project.
For detailed information check repo files, there are some hidden "gems" inside models folder,
which triggered some events on DB side for proper data mutation.

## User API

### GET /api/users

- **Description**: Retrieve all users.
- **Request Parameters**: None.
- **Response Structure**:
  - Status Code: `200 OK`
  - Response: Array of `User` objects.
    | Field Name | Type | Required | Description |
    | ------------------------ | -------- | -------- | -------------------------------- |
    | user_id | String | Yes | Unique identifier for the user. |
    | user_name | String | Yes | Name of the user. |
    | user_telegram_link | String | Yes | Telegram link of the user. |
    | user_last_name | String | No | Last name of the user. |
    | user_description | String | No | Description about the user. |
    | is_visible | Boolean | No | If the user is visible. |
    | ... | ... | ... | ... |

### GET /api/user/:userId

- **Description**: Retrieve a user by ID.
- **Request Parameters**:
  | Parameter Name | Type | Is Required | Description |
  | -------------- | ------ | ----------- | ------------------------ |
  | userId | String | Yes | Unique identifier of user|

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: `User` object.
    | Field Name | Type | Required | Description |
    | ------------------------ | -------- | -------- | -------------------------------- |
    | user_id | String | Yes | Unique identifier for the user. |
    | ... | ... | ... | ... |

### POST /api/create-user

- **Description**: Create a new user.
- **Request Parameters**:
  | Field Name | Type | Required | Description |
  | ------------------------ | -------- | -------- | -------------------------------- |
  | user_id | String | Yes | Unique identifier for the user. |
  | user_name | String | Yes | Name of the user. |
  | user_telegram_link | String | Yes | Telegram link of the user. |
  | user_last_name | String | No | Last name of the user. |
  | user_description | String | No | Description about the user. |
  | is_visible | Boolean | No | If the user is visible. |
  | ... | ... | ... | ... |

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: `User` object with created data.

### DELETE /api/delete-user/:userId

- **Description**: Delete a user.
- **Request Parameters**:
  | Parameter Name | Type | Is Required | Description |
  | -------------------- | ------ | ----------- | ------------------------ |
  | userId | String | Yes | Unique identifier of user|

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: Deletion status message.

---

## Group API

### GET /api/group

- **Description**: Retrieve all groups.
- **Request Parameters**: None.
- **Response Structure**:
  - Status Code: `200 OK`
  - Response: Array of `Group` objects.
    | Field Name | Type | Required | Description |
    | --------------------- | -------- | -------- | ---------------------------------- |
    | group_id | String | Yes | Unique identifier for the group. |
    | group_admins_id | [String] | Yes | IDs of group admins. |
    | group_link | String | No | Link to the group. |
    | group_name | String | No | Name of the group. |
    | group_type | String | No | Type of the group. |
    | group_hidden_spaces | [String] | No | IDs of hidden spaces in the group. |

### GET /api/group/:groupId

- **Description**: Retrieve a group by ID.
- **Request Parameters**:
  | Parameter Name | Type | Is Required | Description |
  | -------------- | ------ | ----------- | --------------------------- |
  | groupId | String | Yes | Unique identifier of group. |

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: `Group` object.
    | Field Name | Type | Required | Description |
    | --------------------- | -------- | -------- | ---------------------------------- |
    | group_id | String | Yes | Unique identifier for the group. |
    | ... | ... | ... | ... |

### POST /api/create-group

- **Description**: Create a new group.
- **Request Parameters**:
  | Field Name | Type | Required | Description |
  | --------------------- | -------- | -------- | ---------------------------------- |
  | group_id | String | Yes | Unique identifier for the group. |
  | group_admins_id | [String] | Yes | IDs of group admins. |
  | group_link | String | No | Link to the group. |
  | group_name | String | No | Name of the group. |
  | group_type | String | No | Type of the group. |
  | group_hidden_spaces | [String] | No | IDs of hidden spaces in the group. |

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: `Group` object with created data.

### DELETE /api/delete-group/:groupId

- **Description**: Delete a group.
- **Request Parameters**:
  | Parameter Name | Type | Is Required | Description |
  | -------------------- | ------ | ----------- | --------------------------- |
  | groupId | String | Yes | Unique identifier of group. |

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: Deletion status message.

---

## Space API

### GET /api/space

- **Description**: Retrieve all spaces.
- **Request Parameters**: None.
- **Response Structure**:
  - Status Code: `200 OK`
  - Response: Array of `Space` objects.
    | Field Name | Type | Required | Description |
    | ------------------------ | --------- | -------- | --------------------------------- |
    | space_id | String | Yes | Unique identifier for the space. |
    | space_name | String | Yes | Name of the space. |
    | space_description | String | Yes | Description of the space. |
    | space_owner_id | String | Yes | Owner ID of the space. |
    | space_groups_id | [String] | No | IDs of groups in the space. |
    | space_message_hashtags | [String] | No | Hashtags used in space messages. |
    | permissions | Object[] | No | Permissions in the space. |

### GET /api/space/:spaceId

- **Description**: Retrieve a space by ID.
- **Request Parameters**:
  | Parameter Name | Type | Is Required | Description |
  | -------------- | ------ | ----------- | ---------------------------- |
  | spaceId | String | Yes | Unique identifier of space. |

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: `Space` object.
    | Field Name | Type | Required | Description |
    | ------------------------ | --------- | -------- | --------------------------------- |
    | space_id | String | Yes | Unique identifier for the space. |
    | ... | ... | ... | ... |

### POST /api/create-space

- **Description**: Create a new space.
- **Request Parameters**:
  | Field Name | Type | Required | Description |
  | ------------------------ | --------- | -------- | --------------------------------- |
  | space_id | String | Yes | Unique identifier for the space. |
  | space_name | String | Yes | Name of the space. |
  | space_description | String | Yes | Description of the space. |
  | space_owner_id | String | Yes | Owner ID of the space. |
  | space_groups_id | [String] | No | IDs of groups in the space. |
  | space_message_hashtags | [String] | No | Hashtags used in space messages. |
  | permissions | Object[] | No | Permissions in the space. |

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: `Space` object with created data.

### DELETE /api/delete-space/:spaceId

- **Description**: Delete a space.
- **Request Parameters**:
  | Parameter Name | Type | Is Required | Description |
  | -------------------- | ------ | ----------- | ---------------------------- |
  | spaceId | String | Yes | Unique identifier of space. |

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: Deletion status message.

---

## Event API

### GET /api/events

- **Description**: Retrieve all events.
- **Request Parameters**: None.
- **Response Structure**:
  - Status Code: `200 OK`
  - Response: Array of `Event` objects.
    | Field Name | Type | Required | Description |
    | -------------------------------- | ------- | -------- | ------------------------------------ |
    | event_id | String | Yes | Unique identifier for the event. |
    | event_space_id | String | Yes | Identifier of the space. |
    | event_name | String | Yes | Name of the event. |
    | event_description | String | Yes | Description of the event. |
    | event_date | String | Yes | Date of the event. |
    | event_organizer_id | String | Yes | Organizer's ID. |
    | event_organizer_telegram_link | String | Yes | Organizer's Telegram link. |
    | event_organizer_credentials | String | Yes | Organizer's credentials. |
    | event_is_offline | Boolean | Yes | Whether the event is offline. |
    | event_timestamp | Number | Yes | Timestamp of the event. |
    | event_is_verified | Boolean | Yes | If the event is verified. |
    | event_tags | String | No | Tags associated with the event. |
    | event_location | Object | No | Location of the event (nested fields)|
    | event_link | String | No | Link to the event. |

### GET /api/event/:id

- **Description**: Retrieve an event by ID.
- **Request Parameters**:
  | Parameter Name | Type | Is Required | Description |
  | -------------- | ------ | ----------- | --------------------------- |
  | id | String | Yes | Unique identifier of event. |

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: `Event` object.
    | Field Name | Type | Required | Description |
    | -------------------------------- | ------- | -------- | ------------------------------------ |
    | event_id | String | Yes | Unique identifier for the event. |
    | ... | ... | ... | ... |

### POST /api/create-event

- **Description**: Create a new event.
- **Request Parameters**:
  | Field Name | Type | Required | Description |
  | -------------------------------- | ------- | -------- | ------------------------------------ |
  | event_id | String | Yes | Unique identifier for the event. |
  | event_space_id | String | Yes | Identifier of the space. |
  | event_name | String | Yes | Name of the event. |
  | event_description | String | Yes | Description of the event. |
  | event_date | String | Yes | Date of the event. |
  | event_organizer_id | String | Yes | Organizer's ID. |
  | event_organizer_telegram_link | String | Yes | Organizer's Telegram link. |
  | event_organizer_credentials | String | Yes | Organizer's credentials. |
  | event_is_offline | Boolean | Yes | Whether the event is offline. |
  | event_timestamp | Number | Yes | Timestamp of the event. |
  | event_is_verified | Boolean | Yes | If the event is verified. |
  | event_tags | String | No | Tags associated with the event. |
  | event_location | Object | No | Location of the event (nested fields)|
  | event_link | String | No | Link to the event. |

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: `Event` object with created data.

### PATCH /api/update-event

- **Description**: Update an event.
- **Request Parameters**: Similar to `POST /api/create-event`, but not all fields are required.
- **Response Structure**:
  - Status Code: `200 OK`
  - Response: `Event` object with updated data.

### DELETE /api/delete-event/:id

- **Description**: Delete an event.
- **Request Parameters**:
  | Parameter Name | Type | Is Required | Description |
  | -------------- | ------ | ----------- | --------------------------- |
  | id | String | Yes | Unique identifier of event. |

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: Deletion status message.

---

## Message API

### GET /api/message

- **Description**: Retrieve all messages.
- **Request Parameters**: None.
- **Response Structure**:
  - Status Code: `200 OK`
  - Response: Array of `Message` objects.
    | Field Name | Type | Required | Description |
    | -------------------- | --------- | -------- | -------------------------------- |
    | message_id | String | Yes | Unique identifier for the message.|
    | message_group_id | String | Yes | Group ID associated with message.|
    | message_date | Number | Yes | Date of the message. |
    | message_text | String | Yes | Text of the message. |
    | message_tags | [String] | Yes | Tags associated with the message.|
    | message_link | String | Yes | Link associated with the message.|
    | message_user_name | String | Yes | Name of the user who sent message|
    | message_user_photo | String | No | Photo of the user. |
    | message_user_id | String | No | User ID of the sender. |
    | message_space | [String] | No | Spaces associated with message. |

### POST /api/create-message

- **Description**: Create a new message.
- **Request Parameters**:
  | Field Name | Type | Required | Description |
  | -------------------- | --------- | -------- | -------------------------------- |
  | message_id | String | Yes | Unique identifier for the message.|
  | message_group_id | String | Yes | Group ID associated with message.|
  | message_date | Number | Yes | Date of the message. |
  | message_text | String | Yes | Text of the message. |
  | message_tags | [String] | Yes | Tags associated with the message.|
  | message_link | String | Yes | Link associated with the message.|
  | message_user_name | String | Yes | Name of the user who sent message|
  | message_user_photo | String | No | Photo of the user. |
  | message_user_id | String | No | User ID of the sender. |
  | message_space | [String] | No | Spaces associated with message. |

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: `Message` object with created data.

### DELETE /api/delete-message/:messageId

- **Description**: Delete a message.
- **Request Parameters**:
  | Parameter Name | Type | Is Required | Description |
  | -------------------- | ------ | ----------- | --------------------------------- |
  | messageId | String | Yes | Unique identifier of the message. |

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: Deletion status message.

---

## File API

### POST /api/upload-photo

- **Description**: Upload a user photo.
- **Request Parameters**:
  - Photo file in `multipart/form-data`.
- **Response Structure**:
  - Status Code: `200 OK`
  - Response: Status message of upload.
    | Field Name | Type | Description |
    | ---------- | ------ | ---------------------------- |
    | message | String | Message about the upload. |

### POST /api/upload-file

- **Description**: Upload a file.
- **Request Parameters**:
  - File in `multipart/form-data`.
- **Response Structure**:
  - Status Code: `200 OK`
  - Response: Status message of upload.
    | Field Name | Type | Description |
    | ---------- | ------ | ---------------------------- |
    | message | String | Message about the upload. |

### POST /api/upload-file-by-url

- **Description**: Upload a file by URL.
- **Request Parameters**:
  | Parameter Name | Type | Is Required | Description |
  | -------------- | ------ | ----------- | ------------------------ |
  | url | String | Yes | URL of the file to upload|

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: Status message of upload.

### DELETE /api/delete-file/:fileId

- **Description**: Delete a file.
- **Request Parameters**:
  | Parameter Name | Type | Is Required | Description |
  | -------------- | ------ | ----------- | ---------------------- |
  | fileId | String | Yes | Unique identifier of file|

- **Response Structure**:
  - Status Code: `200 OK`
  - Response: Deletion status message.

### GET /api/files

- **Description**: Retrieve all files.
- **Request Parameters**: None.
- **Response Structure**:
  - Status Code: `200 OK`
  - Response: Array of `File` objects.
    | Field Name | Type | Required | Description |
    | ---------- | ------ | -------- | --------------------------------- |
    | space_id | String | Yes | Identifier of the space. |
    | file_id | String | Yes | Unique identifier for the file. |
    | file_name | String | Yes | Name of the file. |
    | file_size | String | Yes | Size of the file. |
    | file_type | String | Yes | Type of the file. |
    | file_url | String | Yes | URL of the file. |
    | file_date | Number | Yes | Date of the file upload. |
    | file_mime | String | No | MIME type of the file. |

---

Made by gracegul hands of Frontend engineer by 💩&🩼 and ❤️.
