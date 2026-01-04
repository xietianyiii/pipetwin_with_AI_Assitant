PIPE_TOOLS = [
    {
        "type": "function",
        "function": {
            "name": "AI_ANALYSIS",
            "description": "对城市地下管网进行智能分析",
            "parameters": {
                "type": "object",
                "properties": {}
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "AI_REPAIR",
            "description": "启动管网智能修复流程",
            "parameters": {
                "type": "object",
                "properties": {}
            }
        }
    },
    {
        "type": "function",
        "function": {
            "name": "PIPE_LIFT",
            "description": "对指定类型的管道进行抬升",
            "parameters": {
                "type": "object",
                "properties": {
                    "type": {
                        "type": "string",
                        "description": "管道类型"
                    },
                    "height": {
                        "type": "number",
                        "description": "抬升高度（米）"
                    }
                },
                "required": ["type", "height"]
            }
        }
    }
]
