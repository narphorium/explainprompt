from importlib import resources as impresources
from pathlib import Path

import anywidget
import explainprompt.jupyter as jupyter
import traitlets

# bundler_output_dir = Path(__file__).parent.parent.parent.parent / "js" / "dist"


def foo():
    inp_file = (impresources.files(jupyter) / 'explainprompt.js')
    return inp_file.open("rt").read()


class ExplainPromptWidget(anywidget.AnyWidget):
    # _esm = bundler_output_dir / "index.esm.js"
    _esm = foo()
    _css = '''
    .cell-output-ipywidget-background {
        background-color: transparent !important;
    }
    .jp-OutputArea-output {
        background-color: transparent;
    }'''
    data = traitlets.Unicode('{"label":"Test"}').tag(sync=True)
    theme = traitlets.Unicode('light').tag(sync=True)
