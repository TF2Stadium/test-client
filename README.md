# TF2Stadium test client

This project implements an E2E test client which interacts with the
TF2Stadium Frontend to drive. It is intended to be used as an automated
integration test for the full stack of TF2Stadium, primarily:

* [Frontend](https://github.com/TF2Stadium/Frontend)
* [Helen](https://github.com/TF2Stadium/Helen)
* (Optionally) [Pauling](https://github.com/TF2Stadium/Pauling)
* (Optionally) [Fumble](https://github.com/TF2Stadium/Fumble)

## Running

First, install the dependencies with `npm install`

Then, to run the client against a specific Frontend instance, you must
specify the base URL like so:

    npm start -- --baseUrl http://example.com:3000/ --params.apiUrl http://localhost:8080/

If not specified, `baseUrl` defaults to `http://localhost:3000/ and
`params.apiUrl` defaults to `http://localhost:8080/`

If running on a headless system, X virtual framebuffers may be needed,
in which case the full command would look like:

    xvfb-run npm start -- --baseUrl http://example.com:8080/ --params.apiUrl http://localhost:8081/

Additional, optional parameters can be specified (Note: must be after the `--`).

| Flag                         | Description                                                                                     |
|------------------------------|-------------------------------------------------------------------------------------------------|
| `--params.viewport.width=X`  | Set the test browser's viewport width. (Default 1200)                                           |
| `--params.viewport.height=X` | Set the test browser's viewport height. (Default 900)                                           |
| `--params.screenshots`       | Set the screenshot output directory, or "false" to disable screenshots. (Default "screenshots") |
