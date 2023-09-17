from typing import Any, Dict, List, Optional, Union

from pydantic import BaseModel, Field, SerializeAsAny


class Loggable(BaseModel):
    iteration: Optional[int] = Field(
        None, description="Differentiates content between multiple iterations of the same chain")

    def remove_steps(self) -> 'Loggable':
        ...


class Selectable(Loggable):
    step: Optional[int] = Field(None, description="The step of the selectable")

    def remove_steps(self):
        self.step = None


class Section(Selectable):
    label: Optional[str] = Field(None, description="The label of the section")
    type: Optional[str] = Field(None, description="The type of the section")
    content: str = Field(..., description="The content of the section")


class CodeSection(Section):
    type: Optional[str] = Field('code', frozen=True)
    language: Optional[str] = Field(
        None, description="The programming language of the code section")


class PromptExample(Selectable):
    label: str = Field(..., description="The label of the prompt example")
    sections: List[SerializeAsAny[Section]] = Field(..., description="The sections of the response")

    def remove_steps(self) -> Loggable:
        super().remove_steps()
        for section in self.sections:
            section.remove_steps()


class FewShotExamples(Selectable):
    type: str = Field('examples', frozen=True)
    examples: List[PromptExample] = Field(..., description="The few-shor examples for the prompt")

    def remove_steps(self) -> Loggable:
        super().remove_steps()
        for example in self.examples:
            example.remove_steps()


class Tool(Selectable):
    label: str = Field(..., description="The label of the tool")
    sections: List[SerializeAsAny[Section]] = Field(
        ..., description="The sections of the tool description")


class ToolDefinitions(Loggable):
    type: str = Field('tools', frozen=True)
    tools: List[Tool] = Field(..., description="The tools used in the prompt")

    def remove_steps(self) -> Loggable:
        super().remove_steps()
        for tool in self.tools:
            tool.remove_steps()


class Scratchpad(Selectable):
    type: str = Field('scratchpad', frozen=True)
    label: Optional[str] = Field(None, description="The label of the scratchpad")
    sections: List[SerializeAsAny[Section]] = Field(
        ..., description="The sections of the scratchpad")

    def remove_steps(self) -> Loggable:
        super().remove_steps()
        for section in self.sections:
            section.remove_steps()


PromptSection = Union[Section, FewShotExamples, ToolDefinitions, Scratchpad]


class PromptChain(Loggable):
    id: str = Field(..., description="The id of the prompt chain")
    label: Optional[str] = Field(None, description="The label of the prompt chain")
    sub_chains: List[str] = Field([], description="The sub-chains in the trajectory")


class PromptChainMessage(Selectable):
    chain: Optional[PromptChain] = Field(None, description="The chain of the message")


class Sentinal(PromptChainMessage):
    type: str = Field('sentinal', frozen=True)


class Prompt(PromptChainMessage):
    type: str = Field('prompt', frozen=True)
    label: str = Field(..., description="The label of the prompt")
    sections: List[PromptSection] = Field(..., description="The sections of the prompt")

    def remove_steps(self) -> Loggable:
        for section in self.sections:
            section.remove_steps()


class ModelResponse(PromptChainMessage):
    type: str = Field('response', frozen=True)
    sections: List[SerializeAsAny[Section]] = Field(..., description="The sections of the response")

    def remove_steps(self) -> Loggable:
        super().remove_steps()
        for section in self.sections:
            section.remove_steps()


class Observation(ModelResponse):
    type: str = Field('tool-response', frozen=True)


class RetrievalQuery(Prompt):
    type: str = Field('retrieval-query', frozen=True)


class RetrievalResult(ModelResponse):
    type: str = Field('retrieval-result', frozen=True)
    label: str = Field(..., description="The label of the result")


class RetrievalResults(PromptChainMessage):
    type: str = Field('retrieval-results', frozen=True)
    results: List[RetrievalResult] = Field(..., description="The retrieval results")


class ToolCall(PromptChainMessage):
    type: str = Field('tool-call', frozen=True)
    name: str = Field(..., description="The tool called")
    arguments: Dict[str, Section] = Field(..., description="The arguments passed to the tool")
