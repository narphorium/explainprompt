from explainprompt.model import ModelResponse, Observation, Scratchpad, Section


def add_response_to_scratchpad(
        scratchpad: Scratchpad, response: ModelResponse):
    response.remove_steps()
    scratchpad.sections.extend(response.sections)
