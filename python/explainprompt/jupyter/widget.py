from importlib import resources as impresources
from pathlib import Path

import anywidget
import explainprompt.jupyter as jupyter
import traitlets


def loadResource(name: str):
    inp_file = (impresources.files(jupyter) / name)
    return inp_file.open("rt").read()


class ExplainPromptWidget(anywidget.AnyWidget):
    _esm = loadResource('widget.js')
    _css = loadResource('widget.css')
    data = traitlets.Unicode('{"label":"Test"}').tag(sync=True)
    theme = traitlets.Unicode('light').tag(sync=True)
