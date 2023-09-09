from abc import abstractmethod
from contextlib import contextmanager
from datetime import datetime
from typing import Optional

from explainprompt.model.data_model import (
    ModelResponse,
    Observation,
    Prompt,
    PromptChain,
    PromptChainMessage,
    RetrievalQuery,
    RetrievalResult,
    RetrievalResults,
    Sentinal,
    ToolCall,
)


class LogHandler:

    logger: 'Logger'

    @abstractmethod
    def log_prompt(self, prompt: Prompt):
        pass

    @abstractmethod
    def log_response(self, response: ModelResponse):
        pass

    @abstractmethod
    def log_observation(self, observation: Observation):
        pass

    @abstractmethod
    def log_sentinal(self, sentinal: Sentinal):
        pass

    @abstractmethod
    def log_retrieval_query(self, query: RetrievalQuery):
        pass

    @abstractmethod
    def log_retrieval_result(self, result: RetrievalResult):
        pass

    @abstractmethod
    def log_tool_call(self, tool_call: ToolCall):
        pass


class MemoryLogHandler(LogHandler):

    def __init__(self):
        self._messages: list[PromptChainMessage] = []

    def log_prompt(self, prompt: Prompt):
        self._messages.append(prompt.model_copy(deep=True))

    def log_response(self, response: ModelResponse):
        self._messages.append(response.model_copy(deep=True))

    def log_observation(self, observation: Observation):
        self._messages.append(observation.model_copy(deep=True))

    def log_sentinal(self, sentinal: Sentinal):
        self._messages.append(sentinal.model_copy(deep=True))

    def log_retrieval_query(self, query: RetrievalQuery):
        self._messages.append(query.model_copy(deep=True))

    def log_retrieval_result(self, result: RetrievalResult):
        if self._messages and not isinstance(self._messages[-1], RetrievalResults):
            self._messages.append(RetrievalResults(results=[], chain=result.chain))
        self._messages[-1].results.append(result.model_copy(deep=True))

    def log_tool_call(self, tool_call: ToolCall):
        self._messages.append(tool_call.model_copy(deep=True))


class FileLogHandler(LogHandler):

    def __init__(self, file_path: str, show_timestamps: bool = True):
        self._file_path = file_path
        self._show_timestamps = show_timestamps

    def _write_log(self, message: PromptChainMessage):
        with open(self._file_path, "a") as f:
            if self._show_timestamps:
                f.write(datetime.now().isoformat() + " ")
            f.write(message.model_dump_json(exclude_none=True) + "\n")

    def log_prompt(self, prompt: Prompt):
        self._write_log(prompt)

    def log_response(self, response: ModelResponse):
        self._write_log(response)

    def log_observation(self, observation: Observation):
        self._write_log(observation)

    def log_sentinal(self, sentinal: Sentinal):
        self.write_log(sentinal)

    def log_retrieval_query(self, query: RetrievalQuery):
        self._write_log(query)

    def log_retrieval_result(self, result: RetrievalResult):
        self._write_log(result)

    def log_tool_call(self, tool_call: ToolCall):
        self._write_log(tool_call)


class Logger:

    def __init__(self, chain: Optional[PromptChain] = None):
        self._handlers: list[LogHandler] = []
        if chain is None:
            chain = PromptChain()
        self._current_chain = [chain]

    def current_chain(self) -> PromptChain:
        return self._current_chain[-1]

    def add_handler(self, handler: LogHandler):
        handler.logger = self
        self._handlers.append(handler)

    def log_prompt(self, prompt: Prompt, chain: Optional[PromptChain] = None):
        prompt.chain = chain or self.current_chain()
        for handler in self._handlers:
            handler.log_prompt(prompt)

    def log_response(self, response: ModelResponse, chain: Optional[PromptChain] = None):
        response.chain = chain or self.current_chain()
        for handler in self._handlers:
            handler.log_response(response)

    def log_observation(self, observation: Observation, chain: Optional[PromptChain] = None):
        observation.chain = chain or self.current_chain()
        for handler in self._handlers:
            handler.log_observation(observation)

    def log_sentinal(self, sentinal: Sentinal, chain: Optional[PromptChain] = None):
        sentinal.chain = chain or self.current_chain()
        for handler in self._handlers:
            handler.log_sentinal(sentinal)

    def log_retrieval_query(self, query: RetrievalQuery, chain: Optional[PromptChain] = None):
        query.chain = chain or self.current_chain()
        for handler in self._handlers:
            handler.log_retrieval_query(query)

    def log_retrieval_result(self, result: RetrievalResult, chain: Optional[PromptChain] = None):
        result.chain = chain or self.current_chain()
        for handler in self._handlers:
            handler.log_retrieval_result(result)

    def log_tool_call(self, tool_call: ToolCall, chain: Optional[PromptChain] = None):
        tool_call.chain = chain or self.current_chain()
        for handler in self._handlers:
            handler.log_tool_call(tool_call)

    @contextmanager
    def with_chain(self, chain: PromptChain) -> 'Logger':
        self.current_chain().sub_chains.append(chain)
        self._current_chain.append(chain)
        yield self
        self._current_chain.pop()
