import logging
from logging.handlers import RotatingFileHandler
from pathlib import Path

from app.core.request_context import get_request_id

LOG_DIR = Path("logs")
LOG_DIR.mkdir(exist_ok=True)

LOG_FILE = LOG_DIR / "app.log"


class RequestIdFilter(logging.Filter):
    """
    给每条日志注入 request_id
    """

    def filter(self, record: logging.LogRecord) -> bool:
        record.request_id = get_request_id()
        return True


def setup_logging():
    """
    初始化全局日志配置
    """
    log_format = (
        "[%(asctime)s] "
        "[%(levelname)s] "
        "[%(name)s] "
        "[req=%(request_id)s] "
        "%(message)s"
    )

    date_format = "%Y-%m-%d %H:%M:%S"

    # 根 logger
    root_logger = logging.getLogger()
    root_logger.setLevel(logging.INFO)

    # -------- 控制台日志 --------
    console_handler = logging.StreamHandler()
    console_handler.setFormatter(
        logging.Formatter(log_format, datefmt=date_format)
    )

    # -------- 文件日志（自动轮转） --------
    file_handler = RotatingFileHandler(
        LOG_FILE,
        maxBytes=10 * 1024 * 1024,  # 10MB
        backupCount=5,
        encoding="utf-8",
    )
    file_handler.setFormatter(
        logging.Formatter(log_format, datefmt=date_format)
    )

    request_filter = RequestIdFilter()
    console_handler.addFilter(request_filter)
    file_handler.addFilter(request_filter)

    # 避免重复添加 handler
    if not root_logger.handlers:
        root_logger.addHandler(console_handler)
        root_logger.addHandler(file_handler)
