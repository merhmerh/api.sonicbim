# SonicBIM

Bridging BIM Models and Data (Proof of Concept)

## Overview

SonicBIM addresses the challenge in Building Information Modeling (BIM) where modelers lack specific knowledge to fill parameters accurately. It connects Revit data to a web app, enabling architects and engineers to input crucial information.

## Solution

-   **Revit Integration**: SonicBIM provides an API endpoint to link Revit to a database server.
-   **Web App**: Architects and engineers easily input data via a user-friendly web app.
-   **Data Sync**: Ensures seamless data synchronization between the web app and Revit.

## Benefits

-   **Data Accuracy**: Architects and engineers enhance data precision.
-   **Efficiency**: Streamlines collaboration and reduces errors.
-   **Time and Cost Savings**: Minimizes revisions, saving resources.

## Conclusion

SonicBIM, a Proof of Concept project, aims to revolutionizes BIM by improving accuracy, efficiency, and collaboration.

# Documentation

## List Projects

This API endpoint list all registered Projects

### Endpoint

-   **URL:** `/api/list_projects`
-   **HTTP Method:** GET

#### Request URL

```
/api/sync_project?project_uuid=3e03f99a-e76d-49f4-9642-d598e9a7788b
```

#### Example Request Body

```json
[
  {
    "id": 12,
    "project_uuid": "3e03f99a-e76d-49f4-9642-d598e9a7788b",
    "created_at": "2023-11-15T16:04:20.573097+00:00",
    "project_name": "3storey erection",
    "project_address": "TS 18 LOT 01418K",
    "project_number": "A1753-00355-2023",
    "checksum": "7ed7aca5bf5d887cc329adda6acb2cd72f0e0c933abffeb94e9cfc52c883d019"
  },
  ...
]

```

## Register Project

This API endpoint allows you to register a new project.

### Endpoint

-   **URL:** `/api/register_project`
-   **HTTP Method:** POST

### Request & Response

#### Request Body

-   The request body should contain a JSON object with the following properties:

    -   `project_name` (String): The name of the project (required).
    -   `project_address` (String): The address of the project (required).
    -   `project_number` (String): The project number (required).

#### Example Request Body

```json
{
	"project_name": "3storey erection",
	"project_address": "TS 18 LOT 01418K",
	"project_number": "A1753-00355-2023"
}
```

#### Example Response (HTTP 200 OK)

```json
{
	"status": "success",
	"message": "Project registered",
	"project_uuid": "xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
}
```

## Sync Project Data

This API endpoint allows you to insert/update project model data with the database.

### Endpoint

-   **URL:** `/api/sync_project`
-   **HTTP Method:** POST

### Request & Response

#### Request Body

-   The request body should contain a JSON object with the following properties:

    -   `project_uuid` (String): The unique identifier of the project (required).
    -   `data` (Array): An array of objects representing model data to be synchronized (required).

#### Example Request Body

```json
{
	"project_uuid": "3e03f99a-e76d-49f4-9642-d598e9a7788b",
	"model_data": [
		{
			"id": 158742,
			"category": "rooms",
			"name": "Room 01",
			"level": "3rd Storey",
			"params": [
				{
					"param_name": "HazardousSubstances",
					"extg_value": ""
				},
				{
					"param_name": "SpaceName",
					"extg_value": ""
				}
			]
		}
	]
}
```

#### Example Respond (HTTP 200 OK)

```json
{
	"status": "success",
	"message": "Project model_data uploaded to the database"
}
```

## Retrieve Project Data

This API endpoint allows you to get project model data from the database.

### Endpoint

-   **URL:** `/api/sync_project`
-   **HTTP Method:** GET

### Request & Response

#### Query Parameters

-   The request should include the following query parameter:

    -   `project_uuid` (String): The unique identifier of the project (required).

#### Example Request URL

```
/api/sync_project?project_uuid=3e03f99a-e76d-49f4-9642-d598e9a7788b
```

#### Example Response (HTTP 200 OK)

```json
{
    "created_at": "2023-11-15T16:53:25.097752+00:00",
    "updated_at": "2023-11-15T17:02:36.598566+00:00",
    "model_data": [{...}],
    "project_uuid": "3e03f99a-e76d-49f4-9642-d598e9a7788b"
}
```
